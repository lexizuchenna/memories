import axios from "axios";

const url = axios.create({ baseURL: "http://localhost:3500" });

// url.interceptors.request.use((req) => {
//   if(localStorage.getItem('profile')) {
//     let token = `Bearer ${JSON.parse(localStorage.getItem('profile').token)}`
//     console.log(token)
//     req.headers.Authorization = token
//   }

//   return req
// })

// Fetch All Posts
export const fetchPosts = async () => {

  let { data } = await url.get("/posts");
  return data;
};

// Create New Post
export const createPost = async (newPost, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let { data } = await url.post("/posts", newPost, config);
    console.log(config)
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Update Post
const updatePost = async (id, postData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let { data } = await url.patch(`/posts/${id}`, postData, config);

    return data;
  } catch (error) {
    console.log(error);
  }
};

// Delete Post
export const deletePost = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let { data } = await url.delete(`/posts/${id}`, config);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Like Post
export const likePost = async (id, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    let { data } = await url.patch(`/posts/${id}/likepost`, '', config)
    console.log(config)
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
