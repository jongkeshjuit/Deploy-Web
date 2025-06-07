import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
// Async thunk to fetch products by collection and optional filter
export const fetchProductsByFilter = createAsyncThunk("products/fetchByFilter", async ({collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit}) => {
    const query = new URLSearchParams();
    if (collection) query.append('collection', collection);
    if (size) query.append('size', size);
    if (color) query.append('color', color);
    if(gender) query.append('gender', gender);
    if (minPrice) query.append('minPrice', minPrice);
    if (maxPrice) query.append('maxPrice', maxPrice);
    if (sortBy) query.append('sortBy', sortBy);
    if (search) query.append('search', search);
    if (category) query.append('category', category);
    if (material) query.append('material', material);
    if (brand) query.append('brand', brand);
    if (limit) query.append('limit', limit);
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products?${query.toString()}`);
    return response.data;
});

// Async thunk to fetch a singer product by ID
export const fetchProductById = createAsyncThunk("products/fetchProductDetails", async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
    return response.data;
});

// Async thunk to update a product
export const updateProducts = createAsyncThunk("products/updateProduc", async ({id, productData}) => {
    const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`,
        productData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }
    );
    return response.data;
});

// Async thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk("products/fetchSimilarProducts", async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/similar/${id}`);
    return response.data;
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        selectedProduct: null,
        similarProducts: [],
        loading: false,
        error: null,
        filter: {
            category: null,
            size: null,
            color: null,
            gender: null,
            brand: null,
            minPrice: null,
            maxPrice: null,
            sortBy: null,
            search: null,
            material: null,
            limit: null,
            collection: null,
        },
    },
    reducers: {
        setFilter: (state, action) => {
            state.filter = {...state.filter, ...action.payload};
        },
        clearFilter: (state) => {
            state.filter = {
            size: null,
            color: null,
            gender: null,
            brand: null,
            minPrice: null,
            maxPrice: null,
            sortBy: null,
            search: null,
            material: null,
            limit: null,
            collection: null,
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByFilter.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsByFilter.fulfilled, (state, action) => {
                state.loading = false;
                state.products = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchProductsByFilter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProducts.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex(product => product._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(updateProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchSimilarProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.similarProducts = action.payload;
            })
            .addCase(fetchSimilarProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setFilter, clearFilter } = productsSlice.actions;
export default productsSlice.reducer;