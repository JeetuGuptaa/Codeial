const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream =  rfs.createStream('access.log', {
  interval : '1d',
  path : logDirectory
});

const development = {
    name : 'development',
    asset_path : '/assets',
    session_cookie_key : 'blahsomething',
    db : 'User',
    smtp : {
        service : 'gamil',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'kudo0272@gmail.com', 
          pass: 'vhpcgeoixhrdkyrk', 
        }
      },
    Google_client_ID : '235673864283-02m3iu64jabb8u79550lqrtssont0thh.apps.googleusercontent.com',
    Google_client_Secret : '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',
    Google_callback_url : 'http://localhost:8000/user/auth/google/callback',
    jwt_secret : 'codeial',
    morgan : {
      mode: 'dev',
      options : {stream : accessLogStream}
    }
}

const production = {
    name : "production",
    asset_path : process.env.CODEIAL_ASSET_PATH,
    session_cookie_key : process.env.CODEIAL_SESSION_COOKIE_KEY,
    db : process.env.CODEIAL_DB,
    smtp : {
        service : 'gamil',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.CODEIAL_SMTP_AUTH_USER, 
          pass: process.env.CODEIAL_STMP_AUTH_PASS, 
        }
      },
    Google_client_ID : process.env.CODEIAL_GOOGLE_CLIENT_ID,
    Google_client_Secret : process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    Google_callback_url : process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret : process.env.CODEIAL_JWT_SECRET,
    morgan : {
      mode: 'combined',
      options : {stream : accessLogStream}
    }
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT)==undefined? development :eval(process.env.CODEIAL_ENVIRONMENT);