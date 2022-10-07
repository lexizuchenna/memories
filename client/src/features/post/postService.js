import axios from "axios";

const url = "http://localhost:3500/posts";

// Fetch All Posts
export const fetchPosts = async () => {
  let { data } = await axios.get(url);
  return data;
};

// Create New Post
export const createPost = async (newPost) => {
  try {
    let { data } = await axios.post(url, newPost);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Update Post
const updatePost = async (id, postData) => {
  try {
    let { data } = await axios.patch(`${url}/${id}`, postData);

    return data;
  } catch (error) {
    console.log(error);
  }
};

// Delete Post
export const deletePost = async (id) => {
  try {
    let { data } = await axios.delete(`${url}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Like Post
export const likePost = async (id) => {
  try {
    let { data } = await axios.patch(`${url}/${id}/likepost`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postService = {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
};

export default postService;
