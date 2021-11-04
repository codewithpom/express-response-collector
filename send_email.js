const nodemailer = require('nodemailer');
require('dotenv').config()


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD // use a APP password and take it from google mail
  }
});

function send_mail(to_email, subject, text){
  const mailOptions = {
    from: process.env.EMAIL,
    to: to_email,
    subject: subject,
    text: text
  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
}

module.exports = {
  send_mail: send_mail
}


