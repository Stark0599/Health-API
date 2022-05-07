const db = require('../database');

async function getTokenOfCaregiver(caregiverNotificationsCode) {
    const caregiverRef = db.collection('Caregivers').doc(caregiverNotificationsCode);
    const caregiverDoc = await caregiverRef.get()
    if(caregiverDoc.exists){
        return caregiverDoc.data().TokenFCM;
    }
}

module.exports = getTokenOfCaregiver;