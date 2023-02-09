const mongoose = require('mongoose');

const homeChatschema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{
    
    timestamps : true
})

const HomeChat = mongoose.model('HomeChat', homeChatschema);
module.exports = HomeChat;