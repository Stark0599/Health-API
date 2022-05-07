function createHtmlTemplate(patientData,lastLocation,language){
    //ver la forma de obtener los datos que el paciente quiere compartir
    const {address,allergies,bloodType,cellPhone,emergencyContact,gender,homePhone,identificationDocument,lastName,medicalCondition,name} = patientData;
    let html = "";
    //de acuerdo al language
    if(!isEmpty(name) && !isEmpty(lastName)){
        if(language=="EN"){
            html+= `
            <div style="font-family: Arial, Helvetica, sans-serif;">
            <p style="font-size:16px">${name} ${lastName} has had an emergency and needs your help!</p>
            <p style="font-size:16px">His/Her medical ID is as follows:</p>
            <div style="text-align: center;">
                <div style="border-style: solid; border:2px solid cornflowerblue;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);transition: 0.3s; display: inline-block; padding-left: 32px;padding-right: 32px ; border-radius: 10px; ">
                    <div style="padding: 2px 16px;">
                        <h1 style="font-size: 28px; text-align: center; margin: 12px; color: dodgerblue;">Medical ID</h1>
                    </div>
                    <div style="text-align: left; padding-bottom: 1rem;">
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">First name: ${name}</p>
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">Surname: ${lastName}</p>
            `
        }else if(language=="ES"){
            html+= `
            <div style="font-family: Arial, Helvetica, sans-serif;">
            <p style="font-size:16px">${name} ${lastName} ha tenido una emergencia y necesita de tu ayuda!.</p>
            <p style="font-size:16px">Su medical ID es el siguiente:</p>
            <div style="text-align: center;">
                <div style="border-style: solid; border:2px solid cornflowerblue;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);transition: 0.3s; display: inline-block; padding-left: 32px;padding-right: 32px ; border-radius: 10px; ">
                    <div style="padding: 2px 16px;">
                        <h1 style="font-size: 28px; text-align: center; margin: 12px; color: dodgerblue;">Medical ID</h1>
                    </div>
                    <div style="text-align: left; padding-bottom: 1rem;">
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">Nombre: ${name}</p>
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">Apellidos: ${lastName}</p>
            `
        }
        
    }
    if(!isEmpty(gender)){
        if(language=="EN"){
            html+= `
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">Gender: ${gender}</p>
            `
         }else if(language=="ES"){
            html+= `
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">Género: ${gender}</p>
            `
        }
    }
    if(!isEmpty(identificationDocument)){
        if(language=="EN"){
            html+= `
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">Identification document: ${identificationDocument}</p>
            `
        }else if(language=="ES"){
            html+= `
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">DNI: ${identificationDocument}</p>
            `
        }
        
    }
    if(!isEmpty(address)){
        if(language=="EN"){
            html+= `
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">Address: ${address}</p>
            `
        }else if(language=="ES"){
            html+= `
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">Dirección: ${address}</p>
            `
        }
    }
    if(!isEmpty(homePhone)){
        if(language=="EN"){
            html+= `
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">Home phone: ${homePhone}</p>
            `
        }else if(language=="ES"){
            html+= `
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">Teléfono de casa: ${homePhone}</p>
            `
        }
    }
    if(!isEmpty(cellPhone)){
        if(language=="EN"){
            html+= `
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">Cell phone: ${cellPhone}</p>
            `
        }else if(language=="ES"){
            html+= `
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">Celular: ${cellPhone}</p>
            `
        }
        
    }
    if(!isEmpty(emergencyContact)){
        if(language=="EN"){
            html+= `
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">Emergency contact: ${emergencyContact}</p>
            `
        }else if(language=="ES"){
            html+= `
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">Contacto de emergencia: ${emergencyContact}</p>
            `
        }
    }
    if(!isEmpty(bloodType)){
        if(language=="EN"){
            html+= `
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">Blood type: ${bloodType}</p>
            `
        }else if(language=="ES"){
            html+= `
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">Tipo de sangre: ${bloodType}</p>
            `
        }
        
    }
    if(!isEmpty(allergies)){
        if(language=="EN"){
            html+=`
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">Allergies: ${allergies}</p>
            `
        }else if(language=="ES"){
            html+=`
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">Alergias: ${allergies}</p>
            `
        }
        
    }
    if(!isEmpty(medicalCondition)){
        if(language=="EN"){
            html+= `
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">Medical condition: ${medicalCondition}</p>
            `
        }else if(language=="ES"){
            html+= `
            <p style="margin-top: 0;margin-bottom: 4px; font-size: 16px;">Condición médica: ${medicalCondition}</p>
            `
        }
        
    }
    
    html+=`            
                </div>
            </div>
        </div>
    `
    if(!isEmpty(lastLocation)){
        //es necesario saber como se va a recuperar last location para ver como lo voy a mostrar, en primer lugar tengo que armar la url.
        const {latitude,longitude} = lastLocation
        const url="https://maps.google.com/?q="+latitude+","+longitude+"&z=14";
        console.log('Emails: Se comparte ultima ubicacion');
        if(language=="EN"){
            html+= `
            <p style="font-size:16px">The patient's location is as follows:</p>
            `
        }else if(language=="ES"){
            html+= `
            <p style="font-size:16px">La ubicación del paciente es la siguiente:</p>
            `
        }
        
        html+= `
        <div style="text-align: center;">
            <a href="${url}">
                <button style="color:dodgerblue;font-weight: bolder ;background: transparent; border: 2px solid cornflowerblue; border-radius: 10px;font-size: 18px; padding: 8px;">Ir a la ubicación</button>
            </a>
        </div>
        `
    }else{
        console.log('Emails: No se comparte ultima ubicacion');
    }
    html+=`
        </div>
    `
    return html
}


function isEmpty(str) {
    return (!str || 0 === str.length);
}

module.exports = createHtmlTemplate;