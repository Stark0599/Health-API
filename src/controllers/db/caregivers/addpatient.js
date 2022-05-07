const db = require('../database');
const admin = require('../../firebase/admin');

async function addPatientIDToCaregiverDoc(userID,caregiverNotificationsCode){
    const caregiverRef = db.collection('Caregivers').doc(caregiverNotificationsCode);
    await caregiverRef.update({
        patientIDs: admin.firestore.FieldValue.arrayUnion(userID)
    });
}

module.exports = addPatientIDToCaregiverDoc;