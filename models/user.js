const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    },

    name : {
        type : String,
        required : true
    }
},
{
    timestamps : true //this will tell mongoose to create time stamps, of created at and updated at
});

const User = mongoose.model('User', userSchema);

module.exports = User;