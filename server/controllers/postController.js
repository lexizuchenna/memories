const mongoose = require("mongoose");

const postMessage = require("../models/Posts");

// Fetch All Post
const getPosts = async (req, res) => {
  try {
    const postMessages = await postMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

// Create Post
const createPost = async (req, res) => {
  const postData = req.body;
  const newPost = new postMessage({ ...postData, creator: req.userId });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};

// Update Post
const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json("Post not found");
  }

  const updatedPost = await postMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(201).json(updatedPost);
};

// Delete Post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json("Post not found");
    }

    const deletedPost = await postMessage.findByIdAndRemove(id);
    res.status(200).json(deletedPost);
  } catch (error) {
    console.log(error);
  }
};

// Like Post
const likePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.userId) return res.json("Not Logged In");
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json("Post not found");
    }

    let post = await postMessage.findById(id);

    let index = post.likes.findIndex((id) => id === String(req.userId));
    console.log(index)

    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      const liked =  post.likes.filter((id) => id !== req.userId);
      post.likes = liked
    }
    const updatedPost = await postMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
};
