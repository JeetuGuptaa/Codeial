const post = require('../models/post');

module.exports.home = function(req, res){
    // post.find({},function(err, Usersposts){
    //     if(err){
    //         conosle.log(`Error in finding posts ${err}`);
    //         return;
    //     }
    //     return res.render('home', {
    //         title : "Home",
    //         posts : Usersposts
    //     });
    // });

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
        return res.render('home', {
            title : "Home",
            posts : Usersposts
        });
    });
    
}

