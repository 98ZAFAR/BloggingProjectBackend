const Post = require("../models/postModel")

const getAllUserPost = async(req, res)=>{
    try {
        const posts = await Post.find();
        if(!posts) return res.status(404).json({message:"No post found!"});

        return res.status(200).json({message:"All posts fetched successfully!",posts});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server error!"});
    }
};

const getSinglePost = async(req, res)=>{
    try {
        const post = await Post.findById(req.params.postId);

        if(!post) return res.status(404).json({message:"No such post exists!"});

        return res.status(200).json({message:"Fetched the post!", post});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server error!"});
    }
}

module.exports = {getAllUserPost, getSinglePost};