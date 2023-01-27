const { rawListeners } = require('../models/user.js');
const User = require('../models/user.js');
const fs = require('fs');
const path = require('path');

// Async/await not needed as there is only one callback 
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('userProfile',{
            thisUser : user
        });
    });
    
}

module.exports.data = function(req, res){
    return res.end("<h1>Successfully got the request</h1>");
}

//render signUp page
module.exports.signup = function(req, res){
    return res.render('signUp');
}

//get the signUp data
module.exports.create = async function(req, res){
    try{
        //check if password and confirm password are same
        if(req.body.password != req.body.confirmPassword){
            req.flash('error', 'Password and Confirm Password must be same');
            return res.redirect('back');
        }
        //if the password and confirm password are same, check if the email is unique
        let user = await User.findOne({email : req.body.email});
        //if user found then redirect back
        if(user){
            req.flash('error', 'User Already Exists');
            return res.redirect('back');
        }
        //otherwise create user
        let newUser = await User.create(req.body);
        req.flash('success', 'Signed up successfully');
        return res.redirect('/user/signin');
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

//render signIn page
module.exports.signin = function(req, res){
    return res.render('signin');
}

//sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', "You have successfully signed in");
    return res.redirect('/');
}

//signout
module.exports.signout = function(req, res){
    req.logout(function(err){
        if(err){
            req.flash('error', err);
            return res.redirect('back');
        }
        else{
            req.flash('success', "Logged out!");
            res.redirect('/user/signin');
        }
    });
    
}

module.exports.update = async function(req, res){
    // if(req.params.id == req.user.id){
    //     User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
    //         if(err){
    //             req.flash('error', err);
    //             return res.redirect('back');
    //         };
    //         req.flash('success', 'Profile Updated Successfully');
    //         return res.redirect('back');
    //     })
    // }
    // else{
    //     return res.status(401).send('Unauthorized');
    // }

    if(req.params.id == req.user.id){
        try{
            let user = await User.findByIdAndUpdate(req.user.id);
            //now there is a slight difference, since the form is a multipart form,
            //our body parser will not be able to parse the form
            //so we cannot read the form data with req.body

            //but multer takes the req and does it for us, it 
            //Multer adds a body object and a file or files object to the request object.
            //The body object contains the values of the text fields of the form,
            //the file or files object contains the files uploaded via the form.

            User.uploadedAvatar(req, res, function(err){
                if(err){console.log(err)}
                //we would not be able to access req.body without this fxn, we have defined it in user model
                user.name = req.body.name;
                user.email = req.body.email;

                //not everytie someone is going to upload a file
                if(req.file){
                    if(user.avatar  && fs.existsSync(path.join(__dirname, '..', user.avatar))){//checking if user already has an avatar then deleteing it
                        //for deleting a file we need fs module
                        //and since we need path of file we will use path module
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar)); //user avatar contains the file path w.r.t projext folder
                    }
                    //this is saving the avatar path in the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                user.save();
                return res.redirect('back');
            })


        }catch(err){
            req.flash('error', err);
            res.redirect('back');
        }
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}