const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment')

module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email : req.body.email});
        if(!user || user.password!=req.body.password){
            return res.status(422).json({
                message : "Invalid Username/Password"
            });
        }

        return res.status(200).json({
            message : "Here is your token, keep it safe",
            data : {
                token : jwt.sign(user.toJSON(), env.jwt_secret, {expiresIn : '100000'})//user.toJSON() converts user to json
                        //jwt.sign() converts encrypts the user info
            }
        });

    }catch(err){
            console.log(err);
            return res.status(404).json({
            message : "Not found"
        });
    }
}