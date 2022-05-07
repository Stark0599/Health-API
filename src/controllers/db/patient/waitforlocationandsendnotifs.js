const db = require('../database');
const sendEmergencyNotifications = require('../../notifications/emergencynotif')

async function listenForLocation(userID,patientData,tokens) {
    const patientRef = db.collection('Users').doc(userID);
    console.log('Notificaciones: Se iniciará el listener que espera por la ubicacion');
    const unSubscribe = patientRef.onSnapshot(documentSnapshot => {
        data = documentSnapshot.data();
        lastLocation = data.lastLocation;
        if(!isEmpty(lastLocation)){
            console.log('Notificaciones: Se detectó la ubicacion ->',lastLocation);
            //ejecutar la funcion
            sendEmergencyNotifications(userID, patientData.name, patientData.language, lastLocation, tokens);
            //detener el listener
            console.log('Notificaciones: Se detendra el listener que espera por la ubicacion');
            unSubscribe();
            //Se detendra la funcion
            return;   
        }
        rejectGPS = data.rejectGPS
        if(!isEmpty(rejectGPS)){
            console.log('Notificationes: Se denegó el acceso a GPS');
            //ejecutar la funcion
            sendEmergencyNotifications(userID, patientData.name, patientData.language, lastLocation, tokens);
            //detener el listener
            console.log('Notificaciones: Se detendrá el listener que espera por la ubicación.');
            unSubscribe();
            //Se detendra la funcion
            return; 
        }
    }, err =>{
        console.log('Notificaciones: Something went wrong: ',err);
    })
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

module.exports = listenForLocation;