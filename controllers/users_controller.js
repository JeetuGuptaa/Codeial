const User = require('../models/user.js');

module.exports.profile = function(req, res){
    return res.render('userProfile');
}

module.exports.data = function(req, res){
    return res.end("<h1>Successfully got the request</h1>");
}

//render signUp page
module.exports.signup = function(req, res){
    return res.render('signUp');
}

//get the signUp data
module.exports.create = function(req, res){
    console.log(req.body);
    //check if password and confirm password are same
    if(req.body.password != req.body.confirmPassword){
        return res.redirect('back');
    }

    //if the password and confirm password are same, check if the email is unique
    User.findOne({email : req.body.email}, function(err, user){
        if(err){
            console.log("Error in finding in finding user in dataBase");
            return;
        }

        //if user found then redirect back
        if(user){
            return res.redirect('back');
        }

        //otherwise create user
        
        User.create(req.body, function(err, user){
        //in the above step we have passed whole data of form, that includes email, name, password, confirmPassword
        //but we have defined email, name, password so confirm password isn't require
        //mongoose will handle it and ignore confirmPassword
            if(err){
                console.log("Error in creating user", err);
                return;
            }
            console.log("user created", user);
            return res.redirect('/user/signin');
        })
    });
}

//render signIn page
module.exports.signin = function(req, res){
    return res.render('signin');
}

//sign in and create a session for the user
module.exports.createSession = function(req, res){
    //TODO
}