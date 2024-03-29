const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto'); //since in our DB password is required, but in google oauth password won't be there so we will generate a random password using crypto
const User = require('../models/user');
const env = require('./environment');

passport.use(new googleStrategy({
        clientID : env.Google_client_ID,
        clientSecret : env.Google_client_Secret,
        callbackURL : env.Google_callback_url
},
    function(accessToken, refreshToken, profile, done){//accessToken is provided by googleto access the user info
        //refresh token,is used to create a fresh accessToken when accessToken expires
        //profile contains user's info

        //check if user exists
        User.findOne({email : profile.emails[0].value}).exec(function(err, user){
            //a user may have multiple emails, profile.emails get all those emails and we takes teh first one
            if(err){
                console.log(err);
                return done(err);
            }
        
            console.log(profile);
            //if user found
            if(user){
                //set it into req.user
                return done(null, user);
            }
            else{
                //create user
                User.create({
                    name : profile.displayName,
                    email : profile.emails[0].value,
                    password : crypto.randomBytes(20).toString('hex')//to create a random password to store in db
                }, function(err, user){
                    if(err){
                        console.log(err);
                        return ;
                    }
                    return done(null, user)
                });
            }
        })
    }
));

module.exports = passport;
