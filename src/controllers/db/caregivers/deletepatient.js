const db = require('../database');
const admin = require('../../firebase/admin');

async function deletePatientIDToCaregiverDoc(userID,caregiverNotificationsCode){
    const caregiverRef = db.collection('Caregivers').doc(caregiverNotificationsCode);
    await caregiverRef.update({
        patientIDs: admin.firestore.FieldValue.arrayRemove(userID)
    });
}

module.exports = deletePatientIDToCaregiverDoc;