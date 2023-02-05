const User = require('../models/user');
const Friendship = require('../models/Friendship');

module.exports.toggleFriendship = async function(req, res){
    try{
        //link will look like /user/friend/toggelFriend/?to_user=abc
        let friendsDeleted = false;
        console.log(req.query.to_user);
        let to_user = await User.findById(req.query.to_user);
        let from_user = await User.findById(req.user._id);
        let existingFriend = await Friendship.findOne({ $or :
            [
                {
                    to_user : to_user._id,
                    from_user : req.user._id
                },
                {
                    form_user : to_user._id,
                    to_user : req.user._id
                }
            ]
        });

        if(existingFriend){
            from_user.friendships.pull(existingFriend._id);
            from_user.save();
            to_user.friendships.pull(existingFriend._id);
            to_user.save();
            existingFriend.remove();
            friendsDeleted = true;
        }else{
            let friendship = await Friendship.create({
                from_user : req.user._id,
                to_user : to_user._id
            });

            from_user.friendships.push(friendship);
            from_user.save();
            to_user.friendships.push(friendship);
            to_user.save();
        }

        return res.status(200).json({
            data: {
                friendsDeleted : friendsDeleted
            },
            message : 'Request Successfull'
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message : 'Error in processing request'
        });
    }
}

module.exports.remove = async function(req, res){
    try{
        let friend = await Friendship.findById(req.query.friendId);
        let from_user = await User.findById(friend.from_user);
        let to_user = await User.findById(friend.to_user);

        from_user.friendships.pull(friend._id);
        from_user.save();
        to_user.friendships.pull(friend._id);
        to_user.save();

        friend.remove();

        return res.status(200).json({
            data :{
                friendShipId : req.query.friendId
            },
            message : 'Request Successful'
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message : 'Error in processing request'
        });
    }
    
}