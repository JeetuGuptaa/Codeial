const nodemailer = require('../config/nodemailer');

//other way of exporting
exports.newComment = (comment) => {
    let htmlContent = nodemailer.renderTemplate({comment : comment}, '/commentMailer/comment.ejs');
    nodemailer.transporter.sendMail({//sendMail is a predefined function
        from : 'kudo0272@gmail.com',
        to : comment.user.email,
        subject : "New comment Published",
        html : htmlContent
    }, (err, info)=>{
        if(err){
            console.log(err);
            return;
        }
        else console.log(info);
        return;
    })
}

// now we just need to call the above function whenever a new comment is posted