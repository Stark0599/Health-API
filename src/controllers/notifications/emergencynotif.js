const fcm = require('./fcm');

const setNotificationStatusInEmergency = require('../db/patient/setnotificationstatusinemergency');

//funcion que envia mensajes a todos los cuidadores en caso de emergencia
function sendEmergencyNotifications(userID,name,lastLocation,language,tokens){
    const message = {
      data:{
        name:name,
        userID:userID
      },
      tokens:tokens
    }

    if(language=="EN") message['notification'] = { title:'EMERGENCY!', body:name+' urgently need your help!'};
    else if(language=="ES") message['notification'] = { title:'EMERGENCIA!', body:name+' necesita de tu ayuda con urgencia!'};
    

    if(!isEmpty(lastLocation)){
      console.log('Notificaciones: Se comparte ultima ubicacion');
      message['android'] = {
          notification:{
             click_action:"com.stark.notificationsapp.MAPS"
          }
        }
    }

    fcm.sendMulticast(message).then((response)=> {
        console.log('Successfuly sent notification:', response);
        setNotificationStatusInEmergency(userID,true);
    })
    .catch((error) => {
    //en un futuro se podria implementar el manejo de errores de tal forma que se pueda detectar a quienes de los cuidadores no les llegó el mensaje
    console.log('Error sending notification:', error);
    setNotificationStatusInEmergency(userID,false);
    });

}

function isEmpty(str) {
  return (!str || 0 === str.length);
}

module.exports = sendEmergencyNotifications;