const db = require('../database');
const sendEmailsToCaregivers = require('../../emails/sendemergencyemail');

async function listenForLocation(userID,shareDataOfPatient,patientData,emails) {
    const patientRef = db.collection('Users').doc(userID);
    console.log('Emails: Se iniciará el listener que espera por la ubicacion');
    const unSubscribe = patientRef.onSnapshot(async(documentSnapshot) => {
        data = documentSnapshot.data();
        lastLocation = data.lastLocation;
        if(!isEmpty(lastLocation)){
            console.log('Emails: Se detectó la ubicacion ->',lastLocation);
            //ejecutar la funcion
            await sendEmailsToCaregivers(userID,shareDataOfPatient,lastLocation,patientData.language,emails);
            //detener el listener
            console.log('Emails: Se detendra el listener que espera por la ubicacion');
            unSubscribe();
            //Se detendra la funcion
            return;   
        }
        rejectGPS = data.rejectGPS
        if(!isEmpty(rejectGPS)){
            console.log('Emails: Se denegó el acceso a GPS');
            //ejecutar la funcion
            await sendEmailsToCaregivers(userID,shareDataOfPatient,lastLocation,patientData.language,emails);
            //detener el listener
            console.log('Emails: Se detendrá el listener que espera por la ubicación.');
            unSubscribe();
            //Se detendra la funcion
            return; 
        }
    }, err =>{
        console.log('Emails: Something went wrong ',err);
    })
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

module.exports = listenForLocation;