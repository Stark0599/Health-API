const db = require('../database');
//status es un objeto {email:true,notifications:true}
async function setNotificationStatusInEmergency(patientID,status) {
    const patientRef = db.collection('Users').doc(patientID);
    patientRef.update({"statusOfEmergencyContact.notification":status}).then((res)=>{
        console.log('Se actualizo el estado del envio de notificaciones durante emergencia')
    }).catch((e)=>{
        console.log('Error al actualizar el estado del envio de notificaciones durante emergencia')
    })
}

module.exports = setNotificationStatusInEmergency;