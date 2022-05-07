const db = require('../database');

async function getCaregiversEmailsArray(userID) {

    const caregiversRef = db.collection('Users').doc(userID).collection('Caregivers')
    const caregiversSnapshot = await caregiversRef.where('contactEmail','==',true).get()
    if(caregiversSnapshot.empty){
        console.log('No hay cuidadores guardados.');
        return;
    }

    const emails = []
    caregiversSnapshot.forEach(doc =>{
        emails.push(doc.data().Email)
    })

    return emails;
}

module.exports = getCaregiversEmailsArray;