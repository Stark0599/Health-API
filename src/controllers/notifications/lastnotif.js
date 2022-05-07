const fcm = require('./fcm');

function sendDeleteMessage(name,language,token){
    const message = {
        token:token
    }

    if(language=="EN") message['notification'] = { title:'Someone removed you as a stakeholder', body:name+' has removed you from their stakeholders list'};
    else if(language=="ES") message['notification'] = { title:'Alguien te ha eliminado como cuidador', body:name+' te ha eliminado de su lista de cuidadores'};
    

    fcm.send(message).then((response)=>{
        console.log('Successfuly sent message:',response);
    })
    .catch((error)=>{
        console.log('Error sending message:',error);
    });

}

module.exports = sendDeleteMessage;