const Post = require('../models/post');
const comment = require('../models/commment');

//Although this function contains one callback only,async/await is not needed
module.exports.create = async function(req, res){
    try{
        let newPost = await Post.create({
            content : req.body.content,
            user : req.user._id
        });
        req.flash('success', 'Post published');
        return res.redirect('back');
    }
    catch(err){
        req.flash('error', err);
        return;
    }
};

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        // .id gives the id in string 
        // while comparing the ids we need to convert them inito strings
        if(post.user == req.user.id){
            post.remove();
            //deleting comments of post
            await comment.deleteMany({post : post.id});
            req.flash('success', 'Post and respective comments Deleted');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'Invalid Request');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return;
    }
};
    