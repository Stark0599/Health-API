const db = require('../database')

const getStatusOfCaregiver = async (patientID,caregiverNotificationsCode)=>{
    const caregiversOfPatientRef = db.collection('Users').doc(patientID).collection('Caregivers')
    const caregiversOfPatientSnapshot = await caregiversOfPatientRef.where('notificationsCode','==',caregiverNotificationsCode).get()
    if(caregiversOfPatientSnapshot.empty || caregiversOfPatientSnapshot.size==0){
        return
    }
    const caregiverOfPatientSnapshot = caregiversOfPatientSnapshot.docs[0];
    const caregiverOfPatientData = caregiverOfPatientSnapshot.doc();
    if(caregiverOfPatientData == null ){
        return
    }
    const statusOfConfirmation = caregiverOfPatientData.isNotificationsCodeConfirmed
    console.log('Estado de la confirmacion',statusOfConfirmation);
    return statusOfConfirmation
}

module.exports = getStatusOfCaregiver