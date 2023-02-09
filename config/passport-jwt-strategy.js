const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt; //to extract jwt header
const User = require('../models/user');
const env = require('./environment');

let opts ={
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),//telling that we will be finding encryption key from header
    secretOrKey : env.jwt_secret//it will be decrypted using this key, since we have used it to encrypt
}

passport.use(new JWTStrategy(opts, function(jwtPayload, done){//payload contains user info
    User.findById(jwtPayload._id, function(err, user){
        if(err){
            console.log(err);
            return done(err);
        }

        if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    });
    //here user is already there in jwt, we are just fetching it by id to checking is someone is sending fake token
}));

module.exports = passport;