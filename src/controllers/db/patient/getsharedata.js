const db = require('../database');

async function getShareDataOfPatient(userID) {
    const shareDataRef = db.collection('Users').doc(userID).collection('Caregivers').doc('shareData');
    const shareDataDoc = await shareDataRef.get()
    if(shareDataDoc.exists){
        return shareDataDoc.data()
    }
}

module.exports = getShareDataOfPatient;