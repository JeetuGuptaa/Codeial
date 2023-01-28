const Post = require('../../../models/post');
const Comment = require('../../../models/commment');

module.exports.post = async function(req, res){
    try{
        let Usersposts = await Post.find({})
        .populate('user', "-password")//writing -password will not return password
        .populate({
            path : 'comments',
            populate : {
                path : 'user',
                select : '-password'
            }
        });
        
        return res.status(200).json({
            message : "Post successfully send",
            post : Usersposts
        });
    }
    catch(err){
        console.log(err);
        return res.status(404).json({
            message : "Not found"
        });
    } 
}

module.exports.destroy =async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            Comment.deleteMany({post : req.params.id});
            return res.status(200).json({
                message : 'post and associated comments deleted'
            });
        }
        else{
            return res.status(401).json({
                message : "Unauthorized"
            })
        }
        
    }catch(err){
        console.log(err);
        return ;
    }
}

