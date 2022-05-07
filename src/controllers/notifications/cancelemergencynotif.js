const fcm = require('./fcm');

//funcion que envia mensajes a todos los cuidadores en caso de emergencia
function cancelEmergencyNotifications(name,language,tokens){
    const message = {
        tokens:tokens
    }

    if(language=="EN") message['notification'] = { title:'Emergency canceled', body:name+' apparently pressed the emergency button by mistake!'};
    else if(language=="ES") message['notification'] = { title:'Emergencia cancelada', body:name+' al parecer presionó el boton de emergencia por error!'};
    

    fcm.sendMulticast(message).then((response)=> {
        console.log('Successfuly sent message:', response);
    })
    .catch((error) => {
    console.log('Error sending message:', error);
    });

}

module.exports = cancelEmergencyNotifications;