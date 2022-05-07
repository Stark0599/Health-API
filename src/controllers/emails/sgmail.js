//se importa lo necesario para el envio de correos atraves de sendgrid
const sgMail = require('@sendgrid/mail');
//la linea siguiente solo es para desarrollo, en produccion debe quitarse
//require('dotenv').config();
const apiKey = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(apiKey)

module.exports = sgMail