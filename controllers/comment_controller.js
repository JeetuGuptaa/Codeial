const Comment = require('../models/commment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        if(!post) return res.redirect('back');

        let newComment = await Comment.create({
            content : req.body.content,
            user : req.user.id,
            post : req.body.post
            });

        //pushing the comment id into its post
        post.comments.push(newComment); //mongoose feature
        //everytime we update we have to save it, save tells DB that it is the final version save it.
        post.save();
        return res.redirect('back'); 
    }catch(err){
        console.log(err);
        return;
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
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return;
    }
};
