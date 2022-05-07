const sgMail = require('./sgmail')
//requiriendo la funcion que crea la plantilla para el correo
const createHtmlTemplate = require('../../templates/emergencyemail');

const setEmailStatusInEmergency = require('../db/patient/setemailstatusinemergency');


async function sendEmailsToCaregivers(userID,shareData, lastLocation, language, emails) {
    const htmlTemplate = createHtmlTemplate(shareData,lastLocation,language);
    console.log(emails)
    const {name,lastName} = shareData;
    const message = {
        to:emails, //debe ir las personas que recibiran los mensajes
        from:{
            email:"patient.reporter.tool@gmail.com",
            name:"Health App",
        },
        html: htmlTemplate
    }

    if(language=="EN") message['subject'] = name+" "+lastName+" urgently need your help!";
    else if(language=="ES") message['subject'] = name+" "+lastName+" necesita de tu ayuda con urgencia!";
    
    sgMail.sendMultiple(message)
        .then((result)=>{
            console.log('Correos enviados con exito');
            setEmailStatusInEmergency(userID,true);
        })
        .catch((e)=>{
            //en un futuro se podria implementar el manejo de errores de tal forma que se pueda detectar a quienes de los cuidadores no les llegó el mensaje
            console.log(e.message);
            setEmailStatusInEmergency(userID,false);
        })
}

module.exports = sendEmailsToCaregivers;