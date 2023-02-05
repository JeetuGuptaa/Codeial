const mongoose = require('mongoose');

const FriendsSchema = new mongoose.Schema({
    from_user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    to_user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
});

const Friendship = mongoose.model('Friendship', FriendsSchema);
module.exports = Friendship;