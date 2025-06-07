import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk(
    'adminOrder/fetchAllOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/orders`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching orders:", error);
            return rejectWithValue(error.response?.data || error.message || 'Unknown error');
        }
    }
);

// Fetch order details by order ID (admin only)
export const fetchOrderDetails = createAsyncThunk(
    'adminOrder/fetchOrderDetails',
    async ({ orderId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/orders/${orderId}`, {
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
// Update order status (admin only)
export const updateOrderStatus = createAsyncThunk(
    'adminOrder/updateOrderStatus',
    async ({ orderId, status }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/orders/${orderId}`, { status }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error updating order status:", error);
            return rejectWithValue(error.response?.data || error.message || 'Unknown error');
        }
    }
);
// Delete an order (admin only)
export const deleteOrder = createAsyncThunk(
    'adminOrder/deleteOrder',
    async ({ orderId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error deleting order:", error);
            return rejectWithValue(error.response?.data || error.message || 'Unknown error');
        }
    }
);

// Admin order slice
const adminOrderSlice = createSlice({
    name: 'adminOrder',
    initialState: {
        orders: [],
        orderDetails: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch orders';
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
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedOrderIndex = state.orders.findIndex(order => order._id === action.payload._id);
                if (updatedOrderIndex !== -1) {
                    state.orders[updatedOrderIndex] = action.payload;
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to update order status';
            })
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                const deletedOrderId = action.payload._id;
                state.orders = state.orders.filter(order => order._id !== deletedOrderId);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to delete order';
            });
    }
});
export default adminOrderSlice.reducer;