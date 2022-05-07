const {Router} = require('express');
const router = Router();

const getPatientData =  require('../controllers/db/patient/getpatientdata');
const waitForLocationAndSendNotifications =  require('../controllers/db/patient/waitforlocationandsendnotifs');
const waitForLocationAndSendEmails =  require('../controllers/db/patient/waitforlocationandsendemails');
const getShareDataOfPatient =  require('../controllers/db/patient/getsharedata');
const setStatusOfNotificationCaregiverCode = require('../controllers/db/patient/setstatusofcaregivernotifscode');
//const getStatusOfNotificationCaregiverCode = require('../controllers/db/patient/getstatusofcaregiver');
const getEmailsOfCaregivers =  require('../controllers/db/caregivers/getemails');
const getTokensOfCaregivers =  require('../controllers/db/caregivers/gettokens');
const getTokenOfCaregiver =  require('../controllers/db/caregivers/gettoken');
const addPatientToCaregiverDoc = require('../controllers/db/caregivers/addpatient');
const deletePatientToCaregiverDoc = require('../controllers/db/caregivers/deletepatient');
const sendRequestNotification = require('../controllers/notifications/requestnotif');
const sendEmergencyNotifications = require('../controllers/notifications/emergencynotif');
const cancelEmergencyNotifications = require('../controllers/notifications/cancelemergencynotif');
const sendLastNotification = require('../controllers/notifications/lastnotif');
const sendEmailsToCaregivers = require('../controllers/emails/sendemergencyemail');
const cancelEmailsToCaregivers = require('../controllers/emails/sendcancelemergencyemails');
const status = require('../objects/statusOfRequestToCaregiver');

//funcion que verifica que ciertos campos esten llenos
function isEmpty(str) {
    return (!str || 0 === str.length);
}

//se define la ruta que tiene la logica para cuando el paciente con dicho ID tenga una emergencia
router.get('/:patientId',async(req,res)=>{
    const {patientId} = req.params
    if(patientId.toString().length!=20){
      return res.status(404).send('error')
    }

    //se pide la informacion necesaria de firestore
    const patientData = await getPatientData(patientId);
    const shareDataOfPatient = await getShareDataOfPatient(patientId);
    const tokens = await getTokensOfCaregivers(patientId);
    const emails = await getEmailsOfCaregivers(patientId);

    //se realiza el envio de las notificaciones y emails a los cuidadores
    //El problema esta en que aveces se tarda un poco mas en cargar la coordenada en firebase que llegue la notificacion al telefono
   
    if(tokens!=null && tokens.length!=0){
        if(patientData.shareLastLocation && isEmpty(patientData.lastLocation)){
            //Se ejecuta un listener a la base de datos de tal forma que detecte cuando ya se tenga la ubicacion con ello luego se puede enviar la notificacion
            await waitForLocationAndSendNotifications(patientId,patientData,tokens);
        }else{
            sendEmergencyNotifications(patientId, patientData.name, patientData.lastLocation, patientData.language,tokens);
        }
    }
    if(emails!=null && emails.length!=0){
        if(patientData.shareLastLocation && isEmpty(patientData.lastLocation)){
            //Se ejecuta un listener a la base de datos de tal forma que detecte cuando ya se tenga la ubicacion con ello luego se puede enviar la notificacion
            await waitForLocationAndSendEmails(patientId,shareDataOfPatient,patientData,emails);
        }else{
            await sendEmailsToCaregivers(patientId,shareDataOfPatient,patientData.lastLocation,patientData.language,emails);
        }
    }

    console.log(patientId);
    return res.status(200).send('received')
})

//se define la ruta que tiene la logica para cuando se cancela una emergencia
router.get('/ce/p=:patientId',async(req,res)=>{
    const {patientId} = req.params
    if(patientId.toString().length!=20){
      return res.status(404).send('error')
    }

    //se pide la informacion necesaria de firestore
    const patientData = await getPatientData(patientId);
    const tokens = await getTokensOfCaregivers(patientId);
    const emails = await getEmailsOfCaregivers(patientId);

    //se realiza el envio de las notificaciones y emails a los cuidadores
    if(tokens!=null && tokens.length!=0){
        cancelEmergencyNotifications(patientData.name, patientData.language, tokens);
    }
    if(emails!=null && emails.length!=0){
        await cancelEmailsToCaregivers(patientData,emails);
    }
    console.log(patientId);
    return res.status(200).send('received')
})

//se define la ruta que tiene la logica para cuando se envia la solicitud de un paciente a un cuidador.
router.get('/sr/p=:patientID&c=:caregiverNotificationsCode',async(req,res)=>{
    const {patientID, caregiverNotificationsCode} = req.params
    //valida que la ruta sea valida antes de hacer una peticion
    if(patientID.toString().length!=20 || caregiverNotificationsCode.toString().length!=6){
        return res.status(404).send('error')
    }
    console.log('Id del paciente ->',patientID);
    console.log('Id del cuidador ->',caregiverNotificationsCode);

    //se pide la informacion necesaria
    const patientData = await getPatientData(patientID);
    const token = await getTokenOfCaregiver(caregiverNotificationsCode);

    //se envia la notificacion al cuidador
    sendRequestNotification(patientData.name, patientData.lastName, patientData.language, patientID, caregiverNotificationsCode,token);
    //await getStatusOfNotificationCaregiverCode(patientID,caregiverNotificationsCode)
    return res.status(200).send('received')
})

//se define la ruta que tiene la logica para cuando un paciente ha sido aceptado por un cuidador
router.get('/ar/p=:patientID&c=:caregiverNotificationsCode', async(req,res)=>{
    const {patientID, caregiverNotificationsCode} = req.params
    console.log('Id del paciente ->',patientID.toString().length);
    console.log('Id del cuidador ->',caregiverNotificationsCode.toString().length);

    //valida que la ruta sea valida antes de hacer una peticion
    if(patientID.toString().length!=20 || caregiverNotificationsCode.toString().length!=6){
        return res.status(404).send('error')
    }

    //Se cambia el valor de la variable que almacena el estado de la peticion al cuidador
    setStatusOfNotificationCaregiverCode(patientID,caregiverNotificationsCode,status.ACCEPTED);
    //Se añade el paciente a la lista de pacientes del cuidador
    await addPatientToCaregiverDoc(patientID,caregiverNotificationsCode);
    return res.status(200).send('received')
    
})
//se define la ruta que tiene la logica para cuando un paciente ha sido rechazado por un cuidador
router.get('/rr/p=:patientID&c=:caregiverNotificationsCode', async(req,res)=>{
    const {patientID, caregiverNotificationsCode} = req.params
    console.log('Id del paciente ->',patientID.toString().length);
    console.log('Id del cuidador ->',caregiverNotificationsCode.toString().length);

    //valida que la ruta sea valida antes de hacer una peticion
    if(patientID.toString().length!=20 || caregiverNotificationsCode.toString().length!=6){
        return res.status(404).send('error')
    }
    
    //Se cambia el valor de la variable que almacena el estado de la peticion al cuidador
    setStatusOfNotificationCaregiverCode(patientID,caregiverNotificationsCode,status.REJECTED);
    return res.status(200).send('received')
})

//se define la ruta que tiene la logica para cuando un cuidador es eliminado por un paciente.
router.get('/d/p=:patientID&c=:caregiverNotificationsCode',async(req,res)=>{
    const {patientID, caregiverNotificationsCode} = req.params
    console.log('Id del paciente ->',patientID.toString().length);
    console.log('Id del cuidador ->',caregiverNotificationsCode.toString().length);

    //valida que la ruta sea valida antes de hacer una peticion
    if(patientID.toString().length!=20 || caregiverNotificationsCode.toString().length!=6){
        return res.status(404).send('error')
    }
    //se pide la informacion necesaria
    const patientData = await getPatientData(patientID);
    const token = await getTokenOfCaregiver(caregiverNotificationsCode);
    
    //se envia la notificacion al cuidador
    sendLastNotification(patientData.name,patientData.language,token);
    //Se añade el paciente a la lista de pacientes del cuidador
    await deletePatientToCaregiverDoc(patientID,caregiverNotificationsCode);
    return res.status(200).send('received')
})

module.exports = router;