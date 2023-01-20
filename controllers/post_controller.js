const post = require('../models/post');

module.exports.create = function(req, res){
    post.create({
        content : req.body.content,
        user : req.user._id
    }, function(err, newPost){
        if(err){
            console.log("Error in creating post" ,err);
            return;
        }
        return res.redirect('back');
    });
}

