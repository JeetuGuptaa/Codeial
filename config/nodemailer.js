const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');
const env = require('./environment')
let transporter = nodemailer.createTransport(env.smtp);

  //this function returns the rendered ejs
  let renderTemplate = (data, realtivePath) => {
    let htmlTemplate;
    // console.log(path.join(__dirname, '../views/mailers', realtivePath));

    ejs.renderFile(path.join(__dirname, '../views/mailers', realtivePath),
    data,//data contains the data that we pass to the function
    function(err, template){
        if(err){
            console.log("error", err);
            return ;
        }
        
        htmlTemplate =  template;
    })
    return htmlTemplate;
  }

  module.exports = {
    renderTemplate : renderTemplate,
    transporter : transporter
  }