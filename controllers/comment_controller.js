const comment = require('../models/commment');
const post = require('../models/post');

module.exports.create = function(req, res){
    post.findById(req.body.post, function(err, post){
        if(err){
            console.log('Error in fetching post', err);
            return ;
        }
        if(!post) return res.redirect('back');

        comment.create({
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
