const sgMail = require('./sgmail')
//requiriendo la funcion que crea la plantilla para el correo
const createHtmlTemplate = require('../../templates/cancelemergencyemail');

async function sendEmailsToCaregivers(patientData,emails) {
    const htmlTemplate = createHtmlTemplate(patientData);
    console.log(emails)
    const {name,lastName,language} = patientData;
    const message = {
        to:emails, //debe ir las personas que recibiran los mensajes
        from:{
            email:"patient.reporter.tool@gmail.com",
            name:"Health App",
        },
        html: htmlTemplate
    }

    if(language=="EN") message['subject'] = name+" "+lastName+" has canceled the emergency!";
    else if(language=="ES") message['subject'] = name+" "+lastName+" ha cancelado la emergencia!";

    sgMail.sendMultiple(message)
        .then((result)=>{
            console.log('Correos enviados con exito');
        })
        .catch((e)=>{
            console.log(e.message);
        })
}

module.exports = sendEmailsToCaregivers;