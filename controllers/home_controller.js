const post = require('../models/post');
const User = require('../models/user');

//Previous code was having many callbacks, first it was fetching all the posts
//then in the callback it was fetching all the users
//then returning to the browser
//And all of this was happening parallely, causing a callback hell

//to prevent that callback hell, we acn either use promise or async/await

//The word “async” before a function means one simple thing,
// a function always returns a promise. Other values are wrapped in a resolved promise automatically.

//The keyword "await" makes JavaScript wait until that promise settles and returns its result.

//And to catch errors we are using try and catch

module.exports.home = async function(req, res){
    try{
        //populating the user
        //this means, that whole user document will be fetched with post
        let Usersposts = await post.find({})
        .populate('user')
        .populate({
            path : 'comments',
            populate : {
                path : 'user'
            }
        });
        
        let all_users = await User.find({});
        
        return res.render('home', {
            title : "Home",
            posts : Usersposts,
            allUsers : all_users
        });
    }
    catch(err){
        console.log(err);
        return;
    } 
}

