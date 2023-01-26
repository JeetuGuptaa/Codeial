const Post = require('../models/post');
const comment = require('../models/commment');

//Although this function contains one callback only,async/await is not needed
module.exports.create = async function(req, res){
    try{
        let newPost = await Post.create({
            content : req.body.content,
            user : req.user._id
        });

        let createdPost = await Post.findById(newPost.id).populate('user');
        //type of Ajax request is XMLHttpRequest(xhr)
        //check if the request is xhr, if it is then we will return the Json 
        //We return json with a status, status is success because the post is created
        //we will return json in a specific way, we will send created post, a message
        //this Json will be returned back to success handler in ajax call from there we can use it to display post
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post : createdPost
                },
                message : "Post created!" 
            });
        }
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
            if(req.xhr){
                return res.status(200).json({
                    data : {
                        postId : post.id,
                    },
                    message : "Post Deleted"
                });
            }
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
    