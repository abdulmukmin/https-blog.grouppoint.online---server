const nodemailer = require('nodemailer');

function mailer ( email, subject, html, cb ) {
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
                type: "login",
                user: process.env.userMail,
                pass: process.env.passMail
        }
    });
    
    const mailOptions = {
        from: 'pollinformationpoint@pollgroup.com', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        html: html// plain text body
    };
    
     transporter.sendMail(mailOptions, function (err) {
        if(err)
            cb (err)
        else
            cb (null);
     });
}

module.exports = mailer
