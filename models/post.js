const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    //array of all comment id, as with every post we need its comments
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ],
    //array of like ids
    likes : [
        {
            type : mongoose.Schema.Types.ObjectId
        }
    ]
},
{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;