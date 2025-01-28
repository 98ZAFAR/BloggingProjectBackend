const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profileImgUrl:{
        type:String,
        default:'../public/defaultProfile.png',
    },
    role:{
        type:String,
        enum:["USER", "ADMIN"],
        default:"USER",
    }
},{timestamps:true});

const User = mongoose.model('user', UserSchema);

module.exports = User;