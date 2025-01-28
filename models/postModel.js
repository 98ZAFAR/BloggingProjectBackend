const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    imgUrl:{
        type:String,
        required:true,
        default:'#',
    },
    tags:{
        type:Array,
        default:[],
    },
    likes:{
        type:Array,
        default:[],
    }
}, {timestamps:true});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;