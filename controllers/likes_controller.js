const Like = require('../models/Like');
const Comment = require('../models/commment');
const Post = require('../models/post');

module.exports.toggleLike = async function(req, res){
    try{
        //our route looks like 
        //user/like/?id=abc&?type=Post
        let likeOn;
        let deleted = false;
        if(req.query.type=='Post'){
            //likeOn becomes post
            likeOn = await Post.findById(req.query.id);
        }else{
            //likeOn becomes comment
            likeOn = await Comment.findById(req.query.id);
        }

        //check if the like already exists
        let existingLike = await Like.findOne({
            //one user can like one model post/comment only once
            user : req.user._id,
            likeOn : req.query.id,
            onModel : req.query.type
        });

        if(existingLike){
            //pull it out from post/comment and delete it
            likeOn.likes.pull(existingLike._id);
            likeOn.save();
            existingLike.remove();
            deleted = true;
        }else{
            //create a new like
            let newLike = await Like.create({
                user : req.user._id,
                likeOn : req.query.id,
                onModel : req.query.type
            })

            likeOn.likes.push(newLike);
            likeOn.save();
        }

        return res.status(200).json({
            message : 'Request SuccessFul',
            data : {
                deleted : deleted,
                Id : likeOn._id
            }
        });
    }catch(err){
        console.log(err);
        req.flash('error', 'Internal Server Error');
        return res.status(500).json({
            message : 'Internal Server Error'
        });
    }
}