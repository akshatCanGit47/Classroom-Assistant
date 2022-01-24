const nodemailer = require("nodemailer");
const ejs=require('ejs');
const path= require('path');

//defining transporter (transporter is an object which we will attach with nodemailer)
let transporter =nodemailer.createTransport({
    serice: 'gmail',
    host: 'smtp.gmail.com',
    port:587,
    secure:'false',
    auth:{
        user: 'alchemy.cn18',
        pass: 'codingninjas'
    }
});


let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers',relativePath),
        data,
        function(err, template){
            if(err){console.log('error in rendering template');}

            mailHTML = template;
        }
    )

    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}