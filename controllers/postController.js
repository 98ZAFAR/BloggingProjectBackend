const Post = require("../models/postModel");

const handlePostCreate = async (req, res) => {
  let { title, content, tags } = req.body;
  const imgUrl = req.file?req.file.path:"#";
  tags = tags.split(' ');

  if (!title || !content || !tags) {
    return res.status(400).json({ error: "All fields are mandatory!" });
  }
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const post = await Post.create({
      title,
      content,
      imgUrl,
      userId: req.user._id,
      tags,
    });

    return res
      .status(201)
      .json({ message: "Post created successfully!", post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error!" });
  }
};

const handlePostFetchAllUser = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user._id });

    if (!posts) {
      return res.status(400).json({ message: "No posts available!" });
    }

    return res.status(200).json({ posts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error!" });
  }
};

const handlePostFetch = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId });

    if (!post) {
      return res.status(400).json({ message: "No posts available!" });
    }

    return res.status(200).json({ post });
  } catch (error) {
    console.error("Error fetching the post : ",error);
    return res.status(500).json({ message: "Server Error!" });
  }

};

const handlePostEdit = async (req, res) => {
  try {
    const { title, content, imgUrl, tags } = req.body;

    const post = await Post.find({ _id: req.params.postId });

    if (!post) return res.status(400).json({ message: "No such post exists!" });

    const details = await Post.updateOne(
      { _id: req.params.id },
      {
        title: title ? title : post.title,
        content: content ? content : post.title,
        imgUrl: imgUrl ? imgUrl : post.imgUrl,
        tags: tags ? tags : post.tags,
      }
    );

    return res
      .status(201)
      .json({ message: "Post updated successfully!", details });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error!" });
  }
};

const handlePostDelete = async (req, res) => {
  try {
    const post = await Post.find({ _id: req.params.postId });

    if (!post) return res.status(400).json({ message: "No such post exists!" });

    await Post.deleteOne({ _id: req.params.id });

    return res.status(202).json({ message: "Post deleted  successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error!" });
  }
};

const handlePostLike = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId });

    if (!post) return res.status(400).json({ message: "No post found!" });

    let updatedLikes = post.likes;
    if (!updatedLikes.includes(req.user._id) || !updatedLikes)
      updatedLikes.push(req.user._id);
    else
      updatedLikes = updatedLikes.filter((userId)=>userId!=req.user._id);

    const details = await Post.updateOne(
      { _id: req.params.postId },
      { likes: updatedLikes }
    );

    return res.status(201).json({ message: "Like added!", details });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error!" });
  }
};

module.exports = {
  handlePostCreate,
  handlePostFetchAllUser,
  handlePostFetch,
  handlePostEdit,
  handlePostDelete,
  handlePostLike,
};
