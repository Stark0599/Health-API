const db = require('../database');

function setStatusOfNotificationCaregiverCode(patientID,caregiverNotificationsCode,status){
    const caregiversOfPatientRef = db.collection('Users').doc(patientID).collection('Caregivers');
    caregiversOfPatientRef.where('notificationsCode','==',caregiverNotificationsCode).get().then(async function (caregiversSnapshot) {
        if(caregiversSnapshot.empty){
            console.log('El cuidador no esta guardado dentro de la base de datos');
            return;
        }
        const doc = caregiversSnapshot.docs[0];
        console.log('Nombre del cuidador->',doc.data().Nombre);
        await doc.ref.set({isNotificationsCodeConfirmed:status},{merge:true}); 
    }).catch((e)=>{
        console.log('error -> '+e);
    })
}

module.exports = setStatusOfNotificationCaregiverCode;