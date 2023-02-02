const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    //defines the objectId of liked object
    likeOn : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        refPath : 'onModel'//this means it is going to take reference from onModel property
    },
    //defines the type of liked object, since this is a dynamic reference
    //means the likeOn can either have id of post or comment depending on the onModel property
    onModel : {
        type : String,
        required : true, 
        enum : ['Post', 'Comment']//enum is optional, it tslls that onModel can either take Comment or Post as value
    }
},{
    timestamps: true
});

//now in post and comment model we are going to tell them to have an array of likes, so that we can easily get all the likes on a comment or a post
const Like = mongoose.model('Like', likeSchema);
module.exports = Like;