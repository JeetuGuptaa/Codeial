const Comment = require('../models/commment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){
        if(err){
            console.log('Error in fetching post', err);
            return ;
        }
        if(!post) return res.redirect('back');

        Comment.create({
            content : req.body.content,
            user : req.user.id,
            post : req.body.post
        }, function(err, newComment){
            if(err){
                console.log('Error in creating comment', err);
                return ;
            }
            //pushing the comment id into its post
            post.comments.push(newComment); //mongoose feature
            //everytime we update we have to save it, save tells DB that it is the final version save it.
            post.save();
            return res.redirect('back');
        })

    });  
}

module.exports.destroy = function(req, res){
    //check if comment exists
    console.log(req.query);
    Comment.findById(req.query.id, function(err, comment){
        if(err){
            console.log(err);
            return ;
        }
        if(comment){
            if(comment.user == req.user.id || req.query.author == req.user.id){
                let post_id = comment.post;
                comment.remove();

                Post.findByIdAndUpdate(post_id, {$pull : {comments : req.query.id}}, function(err, post){
                    return res.redirect('back');
                });
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
