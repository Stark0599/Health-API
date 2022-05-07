const db = require('../database');

async function getPatientData(userID) {
    const patientRef = db.collection('Users').doc(userID)
    const patientDoc = await patientRef.get()
    if(patientDoc.exists){
        return patientDoc.data()
    }
}

module.exports = getPatientData;