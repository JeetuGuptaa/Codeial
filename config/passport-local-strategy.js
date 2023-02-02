const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("../models/user");

passport.use(new LocalStrategy({
        usernameField : 'email',
        passReqToCallback : true //it passes the request to the callback function
    },
    function(req, email, password, done){//done is callbac function, takes 2 arguments err(if any otherwise null), 2nd user found or not
        //find the user and establish the identity
        User.findOne({email : email}, function(err, user){
            if(err){
                req.flash('error', err);
                return done(err);
            }

            if(!user || password!=user.password){
                req.flash('error', 'Invalid Username/Password');
                return done(null, false);
            }
            else{
                return done(null, user);
            }
        })
    }
));


//serializing user, teling passport to store only id in cookie in encrypted form 
passport.serializeUser(function(user, done){
    done(null, user.id);
});


//deserializing, checking if the id in cookie matches with id in database
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log("Error in finding user->passport", err);
            return done(err);
        }

        return done(null, user);
    })
});

//creating a function(middleware) inside passport to check wheter the user is signed in or not, 
//if not signedin then we will redirect it to signin page
//else pass the request to the next function(controller's action)
passport.checkAuthentication = function(req, res, next){
    //check if the user is authenticated/signed
    if(req.isAuthenticated()){//passport's function to check wheter the user is authenticated ot not
        next();
    }
    else{
        if(req.xhr){
            return res.status(200).json({
                data : {
                    redirect : '/user/signin'
                },
                message : 'User not signedIn',
            });
        }
        return res.redirect('/user/signin');
    }
    
}

passport.setAutherizedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the
        //locals for the view
        res.locals.user = req.user;
    }

    next();
}

passport.checkIfSignedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    else{
        next();
    }
}

module.exports = passport;
