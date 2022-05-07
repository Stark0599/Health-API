function createHtmlTemplate(patientData){
    //ver la forma de obtener los datos que el paciente quiere compartir
    const {name,lastName,language} = patientData;
    //se traduce 
    let html = "";
    if(!isEmpty(name) && !isEmpty(lastName)){
        if(language=="EN"){
            html+= `
            <div style="font-family: Arial, Helvetica, sans-serif;">
            <p style="font-size:16px">${name} ${lastName} accidentally pressed the emergency button, sorry for the inconvenience.</p>
            </div>
            `               
        }else if(language=="ES"){
            html+= `
            <div style="font-family: Arial, Helvetica, sans-serif;">
            <p style="font-size:16px">${name} ${lastName} presionó de casualidad el botón de emergencia, disculpa por el inconveniente.</p>
            </div>
            `               
        }
    }
    return html
}


function isEmpty(str) {
    return (!str || 0 === str.length);
}

module.exports = createHtmlTemplate;