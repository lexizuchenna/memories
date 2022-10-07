import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import postService from './postService'

const initialState = {
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Fetch Post Slice
export const fetchPosts = createAsyncThunk('posts/getAll', async () => {
    return await postService.fetchPosts()
})

// Create Post Slice
export const createPost = createAsyncThunk('posts/create', async (formData) => {
    return await postService.createPost(formData)
})

// Update Post Slice
export const updatePost = createAsyncThunk('posts/update', async ({currentId, postData}) => {
    return await postService.updatePost(currentId, postData)
})

// Delete Post Slice
export const deletePost = createAsyncThunk('posts/delete', async (id) => {
    return await postService.deletePost(id)
})

// Like Post Slice
export const likePost = createAsyncThunk('posts/like', async (id) => {
    return await postService.likePost(id)
})

export const postSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createPost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = [...state.posts, action.payload]
                state.message = 'Post Created'
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updatePost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
                state.message = 'Post updated'
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = state.posts.filter((post) => post._id !== action.payload._id)
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(likePost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(likePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
                state.message = 'Post liked'
            })
            .addCase(likePost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = postSlice.actions

export default postSlice.reducer