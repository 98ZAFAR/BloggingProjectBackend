const Post = require("../models/postModel")

const getAllUserPost = async(req, res)=>{
    try {
        const posts = await Post.find();
        if(!posts) return res.status(400).json({message:"No post found!"});

        return res.status(200).json({message:"All posts fetched successfully!",posts});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server error!"});
    }
};

module.exports = {getAllUserPost};