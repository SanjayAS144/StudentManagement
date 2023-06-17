const nodemailer = require("nodemailer");
require('dotenv').config()
let sender_email = process.env.sender_email; 
let sender_password = process.env.sender_password; 






let mail = async (mailObj) =>{
  console.log("Started to Send the mail")
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: sender_email, // generated ethereal user
      pass: sender_password, // generated ethereal password
    },
  });


  let info = await transporter.sendMail({
    from: `"NoReplay 👻" <${sender_email}>`, // sender address
    to: mailObj.toAddresses, // list of receivers
    subject: mailObj.subject, // Subject line
    html: mailObj.emailBody,
    attachments:mailObj.attechments == ""?[]:[
      {
        path: mailObj.attechments,
			  type: 'file',
			  headers: { 'Content-ID': '<my-image>' }
      }
    ] // html body
  })
  console.log("mail sent")
    return info;
}

module.exports = mail
