const Post = require('../models/post');
const comment = require('../models/commment');
const { rawListeners } = require('../models/commment');

//Although this function contains one callback only,async/await is not needed
module.exports.create = async function(req, res){
    try{
        let newPost = await Post.create({
            content : req.body.content,
            user : req.user._id
        });
        return res.redirect('back');
    }
    catch(err){
        console.log("Error in creating post", err);
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
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }catch(err){
        console.log("Error", err);
        return;
    }
};
    