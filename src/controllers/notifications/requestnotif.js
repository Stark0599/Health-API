const fcm = require('./fcm');
const status = require('../../objects/statusOfRequestToCaregiver');
const setStatusOfNotificationCaregiverCode = require('../db/patient/setstatusofcaregivernotifscode')

function sendRequestNotification(name, lastname, language, patientID, caregiverNotificationsCode ,token){
    const message = {
        data:{
            patientID:patientID,
            caregiverNotificationsCode:caregiverNotificationsCode,
            requestCode: 'newPatientRequest'
        },
        token:token
    }

    if(language=="EN") {
        message['data']['title'] = 'You have a request for a new patient!'
        message['data']['body'] = name+' '+lastname+' wants you to be his/her stakeholder, do you want to accept it?'
    }    
    else if(language=="ES") {
        message['data']['title'] = '¡Tienes una solicitud de un nuevo paciente!'
        message['data']['body'] = name+' '+lastname+' quiere que seas su cuidador, ¿deseas aceptarlo?'
    }

    fcm.send(message).then((response)=>{
        setStatusOfNotificationCaregiverCode(patientID,caregiverNotificationsCode,status.REQUEST_SENT)
        console.log('Successfuly sent message:',response);
    })
    .catch((error)=>{
        console.log('Error sending message:',error);
    });
}

module.exports = sendRequestNotification;