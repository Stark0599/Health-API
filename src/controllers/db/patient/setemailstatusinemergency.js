const db = require('../database');
//status es un objeto {email:true,notifications:true}
async function setEmailStatusInEmergency(patientID,status) {
    const patientRef = db.collection('Users').doc(patientID);
    patientRef.update({"statusOfEmergencyContact.email":status}).then((res)=>{
        console.log('Se actualizo el estado del envio de email durante emergencia')
    }).catch((e)=>{
        console.log('Error al actualizar el estado del envio de email durante emergencia')
    })
}

module.exports = setEmailStatusInEmergency;