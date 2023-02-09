const post = require('../models/post');
const User = require('../models/user');
const HomeChat = require('../models/homeChat');

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
        .sort('-createdAt')
        .populate('user')
        .populate({
            path : 'comments',
            populate : {
                path : 'user'
            }
        });
        // user
        let all_users = await User.find({});
        
        //user's Friends
        let userFriends;
        if(req.user){
            userFriends = await User.findById(req.user._id)
            .select('-password')
            .populate({
                path : 'friendships',
                populate : {
                    path : 'from_user to_user',
                    select : '-password'
                },
                
            });
        }
    
        let homeChat = await HomeChat.find({})
        .sort('createdAt')
        .populate('user', '-password');
        return res.render('home', {
            title : "Home",
            posts : Usersposts,
            allUsers : all_users,
            userFriends : userFriends,
            homeChat : homeChat
        });

        
    }
    catch(err){
        console.log(err);
        return;
    } 
}

