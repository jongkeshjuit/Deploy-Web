import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching user orders
export const fetchUserOrders = createAsyncThunk(
    'order/fetchUserOrders',
    async ({userId}, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`, {
                params: { userId },
                headers: {
                    Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : ''
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching user orders:", error);
            return rejectWithValue(error.response?.data || error.message || 'Unknown error');
        }
    }
);

// Async thunk for fetching order details by order ID
export const fetchOrderDetails = createAsyncThunk(
    'order/fetchOrderDetails',
    async ({orderId}, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching order details:", error);
            return rejectWithValue(error.response?.data || error.message || 'Unknown error');
        }
    }
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        orderDetails: null,
        totalOrders: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch user orders';
            })
            .addCase(fetchOrderDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.orderDetails = action.payload;
            })
            .addCase(fetchOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch order details';
            });
    },
});

export default orderSlice.reducer;