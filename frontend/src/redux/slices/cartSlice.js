import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : {produts:[]};
};

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

// Fetch cart for a user or guest
export const fetchCart = createAsyncThunk("cart/fetchCart", async ({userId, guestId}, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart`, {
            params: { userId, guestId }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching cart:", error);
        return rejectWithValue(error.response.data);
    }
});

// Add an item to the cart for a user or guest
export const addToCart = createAsyncThunk("cart/addToCart", async ({productId, quantity, size, color, userId, guestId}, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/cart`, {
            productId,
            quantity,
            size,
            color,
            userId,
            guestId
        });
        return response.data;
    } catch (error) {
        console.error("Error adding to cart:", error);
        return rejectWithValue(error.response.data);
    }
});

// Update the quantity of an item in the cart
export const updateCartItem = createAsyncThunk("cart/updateCartItem", async ({productId, quantity, userId, guestId, size, color}, {rejectWithValue}) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/cart/${itemId}`, {
            productId,
            quantity,
            size,
            color,
            userId,
            guestId
        });
        return response.data;
    } catch (error) {
        console.error("Error updating cart item:", error);
        return rejectWithValue(error.response.data);
    }
});

// Remove an item from the cart
export const removeFromCart = createAsyncThunk("cart/removeFromCart", async ({userId, guestId, size, color}, {rejectWithValue}) => {
    try {
        const response = await axios({
            method: 'DELETE',
            url: `${import.meta.env.VITE_API_URL}/api/cart`,
            data: {
                userId,
                guestId,
                size,
                color
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error removing from cart:", error);
        return rejectWithValue(error.response.data);
    }
});

// Merge guest cart with user cart
export const mergeCart = createAsyncThunk("cart/mergeCart", async ({userId, guestId}, {rejectWithValue}) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/cart/merge`,
            {
                userId,
                guestId
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error merging cart:", error);
        return rejectWithValue(error.response.data);
    }
});

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: loadCartFromLocalStorage(),
        loading: false,
        error: null,
    },
    reducers: {
        clearCart: (state) => {
            state.products = {produts:[]};
            localStorage.removeItem('cart');
            // saveCartToLocalStorage(state.products);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                saveCartToLocalStorage(state.products);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || action.payload || 'Failed to fetch cart';
            })
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.products.produts.push(action.payload);
                saveCartToLocalStorage(state.products);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.produts.findIndex(item => item.productId === action.payload.productId);
                if (index !== -1) {
                    state.products.produts[index] = action.payload;
                    saveCartToLocalStorage(state.products);
                }
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.produts.findIndex(item => item.productId === action.payload.productId);
                if (index !== -1) {
                    state.products.produts.splice(index, 1);
                    saveCartToLocalStorage(state.products);
                }
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(mergeCart.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(mergeCart.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                saveCartToLocalStorage(state.products);
            })
            .addCase(mergeCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
