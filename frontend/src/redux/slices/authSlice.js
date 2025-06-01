import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for API
const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:9000';

// Retrieve user info and token from localStorage if available
const userFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const tokenFromStorage = localStorage.getItem('userToken') || null;

// Check for an existing token in localStorage or generate a new one
const initialGuestId = 
   localStorage.getItem('guestId') || `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
localStorage.setItem('guestId', initialGuestId);

// Initialize state with user info and guest ID
const initialState = {
    userInfo: userFromStorage,
    userToken: tokenFromStorage,
    guestId: initialGuestId,
    loading: false,
    error: null,
    success: false,
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            
            // Đúng endpoint: /api/users/login
            const response = await axios.post(
                `${API_URL}/api/users/login`, 
                userData,
                config
            );
            
            // Lưu thông tin vào localStorage
            localStorage.setItem('userInfo', JSON.stringify(response.data.user));
            localStorage.setItem('userToken', response.data.token);
            
            return response.data; // Return cả user và token
        } catch (error) {
            // Handle error response
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

// Async thunk for user Registration
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, {rejectWithValue}) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            
            // Đúng endpoint: /api/users/register
            const response = await axios.post(
                `${API_URL}/api/users/register`, 
                userData,
                config
            );
            
            // Lưu thông tin vào localStorage
            localStorage.setItem('userInfo', JSON.stringify(response.data.user));
            localStorage.setItem('userToken', response.data.token);
            
            return response.data; // Return cả user và token
        } catch (error) {
            // Handle error response
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

// Async thunk for getting user profile
export const getUserProfile = createAsyncThunk(
    'auth/getUserProfile',
    async (_, {getState, rejectWithValue}) => {
        try {
            const token = getState().auth.userToken;
            
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            
            const response = await axios.get(
                `${API_URL}/api/users/profile`,
                config
            );
            
            return response.data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('userInfo');
            localStorage.removeItem('userToken');
            state.userInfo = null;
            state.userToken = null;
            state.loading = false;
            state.error = null;
            state.success = false;
            // Generate new guest ID on logout
            state.guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('guestId', state.guestId);
        },
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = false;
        },
        generateNewGuestId: (state) => {
            state.guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('guestId', state.guestId);
        },
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload.user;
                state.userToken = action.payload.token;
                state.success = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            // Register cases
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload.user;
                state.userToken = action.payload.token;
                state.success = true;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            // Get profile cases
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {logout, clearError, clearSuccess, generateNewGuestId} = authSlice.actions;
export default authSlice.reducer;