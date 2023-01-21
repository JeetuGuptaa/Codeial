const Post = require('../models/post');
const comment = require('../models/commment');
const { rawListeners } = require('../models/commment');
module.exports.create = function(req, res){
    Post.create({
        content : req.body.content,
        user : req.user._id
    }, function(err, newPost){
        if(err){
            console.log("Error in creating post" ,err);
            return;
        }
        return res.redirect('back');
    });
};

module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){
        if(err) return;

        if(post){
            // .id gives the id in string 
            // while comparing the ids we need to convert them inito strings
            if(post.user == req.user.id){
                post.remove();

                //deleting comments of post
                comment.deleteMany({post : post.id}, function(err){
                    if(err) return ;
                    return res.redirect('back');
                })
            }
            else{
                return res.redirect('back');
            }
        }
        else{
            return res.redirect('back');
        }
    });
};
    