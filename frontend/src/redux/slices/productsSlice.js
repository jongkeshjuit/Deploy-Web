import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as productService from '../../services/productService';

// Async thunk to fetch products by filter
export const fetchProductsByFilter = createAsyncThunk("products/fetchByFilter", async (filters) => {
    const response = await productService.getProducts(filters);
    return response;
});

// Async thunk to fetch a single product by ID
export const fetchProductById = createAsyncThunk("products/fetchProductDetails", async (id) => {
    const response = await productService.getProductById(id);
    return response;
});

// Async thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk("products/fetchSimilarProducts", async (id) => {
    const response = await productService.getSimilarProducts(id);
    return response;
});

// Async thunk to fetch best sellers
export const fetchBestSellers = createAsyncThunk("products/fetchBestSellers", async () => {
    const response = await productService.getBestSellers();
    return response;
});

// Async thunk to fetch new arrivals
export const fetchNewArrivals = createAsyncThunk("products/fetchNewArrivals", async () => {
    const response = await productService.getNewArrivals();
    return response;
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        selectedProduct: null,
        similarProducts: [],
        bestSellers: [],
        newArrivals: [],
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
            state.filter = { ...state.filter, ...action.payload };
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
            // Handle fetchProductsByFilter
            .addCase(fetchProductsByFilter.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsByFilter.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products || [];
            })
            .addCase(fetchProductsByFilter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle fetchProductById
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
            // Handle fetchSimilarProducts
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
            })
            // Handle fetchBestSellers
            .addCase(fetchBestSellers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBestSellers.fulfilled, (state, action) => {
                state.loading = false;
                state.bestSellers = action.payload;
            })
            .addCase(fetchBestSellers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Handle fetchNewArrivals
            .addCase(fetchNewArrivals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNewArrivals.fulfilled, (state, action) => {
                state.loading = false;
                state.newArrivals = action.payload;
            })
            .addCase(fetchNewArrivals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setFilter, clearFilter } = productsSlice.actions;
export default productsSlice.reducer;