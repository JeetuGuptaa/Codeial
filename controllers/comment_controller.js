const Comment = require('../models/commment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try{
        
        let post = await Post.findById(req.body.post);
        if(!post){
            console.log('POST NO TFOUND');
            req.flash('error', 'Invalid Request');
            return res.redirect('back');
        }

        let newComment = await Comment.create({
            content : req.body.content,
            user : req.user.id,
            post : req.body.post
            });

        //pushing the comment id into its post
        post.comments.push(newComment); //mongoose feature
        //everytime we update we have to save it, save tells DB that it is the final version save it.
        post.save();
        
        let commentForAjax = await Comment.findById(newComment.id)
        .populate('user')
        .populate({
            path : 'post',
            populate : {
                path : 'user'
            }
        })
        if(req.xhr){
            return res.status(200).json({
                data:{
                    comment : commentForAjax
                },
                message : "Comment Added Successfully"
            });
        }
        req.flash('success', 'Comment added successfully');
        return res.redirect('back'); 
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    } 
};

module.exports.destroy = async function(req, res){
    try{
        //check if comment exists
        let comment = await Comment.findById(req.query.id);
        if(comment.user == req.user.id || req.query.author == req.user.id){
            let post_id = comment.post;
            comment.remove();

            let post = await Post.findByIdAndUpdate(post_id, {$pull : {comments : req.query.id}});

            if(req.xhr){
                return res.status(200).json({
                    data :{
                        comment_id : req.query.id
                    },
                    message : "Deleted"
                });
            }

            req.flash('success', 'Comment Deleted Successfully');
            return res.redirect('back');
        }
        else{
            req.flash('error', "You aren't Authorized");
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
};
