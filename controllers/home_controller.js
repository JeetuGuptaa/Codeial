const post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req, res){
    //populating the user
    //this means, that whole user document will be fetched with post
    post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    })
    .exec(function(err, Usersposts){
        if(err){
            conosle.log(`Error in finding posts ${err}`);
            return;
        }
        
        User.find({}, function(err, all_users){
            if(err){
                conosle.log(`Error in fetching users ${err}`);
                return;
            }
            return res.render('home', {
                title : "Home",
                posts : Usersposts,
                allUsers : all_users
            })
        });
    });
    
}

