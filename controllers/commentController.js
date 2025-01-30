const Comment = require("../models/commentModel");

const handleCommentCreate = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Empty comment!" });

    const comment = await Comment.create({
      userId: req.user._id,
      postId: req.params.postId,
      content,
    });

    return res
      .status(201)
      .json({ message: "Comment added successfully!", comment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Server Error!"});
  }
};

const handleCommentFetch = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });

    return res
      .status(200)
      .json({ message: "Comment fetched successfully!", comments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Server Error!"});
  }
};

const handleCommentDelete = async (req, res) => {
  try {
    const details = await Comment.deleteOne({
      _id: req.params.commentId,
      postId: req.params.postId,
    });

    return res
      .status(200)
      .json({ message: "Comment removed successfully!", details });
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Server Error!"});
  }
};

const handleCommentLike = async(req, res)=>{
  try {
    const comment = await Comment.findOne({_id:req.params.commentId});

    if(!comment) return res.status(400).json({message:"No comment found!"});
    let updatedLikes = comment.likes;

    if(!updatedLikes.includes(req.user._id)) updatedLikes.push(req.user._id);
    else updatedLikes = updatedLikes.filter((userId)=>userId!=req.user._id);

    const details = await Comment.updateOne({_id:req.params.commentId}, {likes:updatedLikes});

    return res.status(201).json({message:"Like added!", details});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Server Error!"});
  }
}

module.exports = {
  handleCommentCreate,
  handleCommentFetch,
  handleCommentDelete,
  handleCommentLike,
};
