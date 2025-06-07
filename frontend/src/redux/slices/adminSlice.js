import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// fetch all users (admin only)
export const fetchAllUsers = createAsyncThunk(
    'admin/fetchAllUsers',
    async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }
);

// Add a new user (admin only)
export const addUser = createAsyncThunk(
    'admin/addUser',
    async (userData) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/users`, userData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error adding user:", error);
            throw error;
        }
    }
);

// Update user details (admin only)
export const updateUser = createAsyncThunk(
    'admin/updateUser',
    async ({ id, name, email, role }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/admin/users/${id}`,
                { name, email, role },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    }
);

// Delete a user (admin only)
export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async (userId) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    }
);

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch users';
            })
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add user';
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update user';
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const userId = action.meta.arg;
                const index = state.users.findIndex(user => user.id === userId);
                if (index !== -1) {
                    state.users.splice(index, 1);
                }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete user';
            });
    },
});
export default adminSlice.reducer;