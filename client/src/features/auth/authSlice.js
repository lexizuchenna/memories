import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('profile'))

const initialState = {
    authData: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}



// Google Auth Slice
export const googleLogin = createAsyncThunk('auth/googleLogin', async (data) => {
    return authService.googleLogin(data)
})
export const logout = createAsyncThunk('auth/logout', async () => {
    return authService.logout()
})

// Register User Slice
export const register = createAsyncThunk('auth/register', async ({formData, navigate}) => {
    try {
        const data = await authService.register(formData);
        navigate('/')
        return data
        
    } catch (error) {
        console.log(error)
    }
})

// Login User Slice
export const login = createAsyncThunk('auth/login', async ({formData,navigate}) => {
    try {
        const data = await authService.login(formData);
        navigate('/')
        return data
    } catch (error) {
        console.log(error)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(googleLogin.pending, (state) => {
            state.isLoading = true
        })
        .addCase(googleLogin.fulfilled, (state, action) => {
            state.isLoading = false
            state.authData = action.payload.data
        })
        .addCase(googleLogin.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(register.pending, (state) => {
            state.isLoading = true
        })
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false
            state.authData = action.payload
            state.message = action.payload?.response?.data
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload?.response?.data
        })
        .addCase(login.pending, (state) => {
            state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.authData = action.payload
            state.message = action.payload?.response?.data
            console.log(action.payload)
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload?.response?.data
        })
        .addCase(logout.pending, (state) => {
            state.isLoading = true
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false
            state.authData = null
        })
        .addCase(logout.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload?.response?.data
        })
    }
})

export const {reset} = authSlice.actions

export default authSlice.reducer