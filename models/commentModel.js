const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post',
    },
    content:{
        type:String,
        required:true,
    },
    likes:{
        type:Array,
        default:[],
    }
}, {timestamps:true});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;