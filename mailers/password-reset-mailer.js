const nodemailer = require('../config/nodemailer');

exports.resetMail = (email, accessToken) => {
    let htmlContent = nodemailer.renderTemplate({
        email : email,
        accessToken : accessToken
        }, '/passwordResetMailer/resetMail.ejs');
    nodemailer.transporter.sendMail({//sendMail is a predefined function
        from : 'kudo0272@gmail.com',
        to : email,
        subject : "Codeial | Password Reset",
        html : htmlContent
    }, (err, info)=>{
        if(err){
            console.log(err);
            return;
        }
        
        return;
    })
}
