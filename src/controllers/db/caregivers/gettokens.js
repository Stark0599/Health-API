const db = require('../database');

async function getTokensOfCaregivers(userID) {
    const caregiversRef = db.collection('Users').doc(userID).collection('Caregivers')
        const caregiversSnapshot = await caregiversRef.where('contactNotifications','==',true).get()
        if(caregiversSnapshot.empty){
            console.log('No hay cuidadores guardados.');
            return;
        }

        const tokensOfCaregivers = []
        caregiversSnapshot.forEach(doc =>{
            tokensOfCaregivers.push(doc.data().TokenFCM)
        })

        return tokensOfCaregivers;
}

module.exports = getTokensOfCaregivers;