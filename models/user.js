const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const AVATAR_PATH = path.join('/uploads/users/avatar');

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
    },
    avatar : {
        type : String
    },
    accessToken : {
        type : String
    },
    validTime : {
        type : Number
    },
    friendships : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Friendship'
        }
    ]
},
{
    timestamps : true //this will tell mongoose to create time stamps, of created at and updated at
});

//disk storage for multer
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //cb is the callback function, takes null and accurate file path
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      //we are appending uniqueSuffix to file name to differentiate between files with same name
      //it add time in miliseconds to the filename
      cb(null, file.fieldname + '-' + uniqueSuffix);
      //file.fieldname will give the name of field of file here it is "avatar"
    }
  })

//static method, We can also use normal export way, static will just make these methods availabe publicay
//userSchema.static.function_name  since these are the methods of userSchema
userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar'); //teling multer about the storge and that we are going
//to upload only one avatar not the array
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema);
module.exports = User;