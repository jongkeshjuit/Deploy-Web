import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000';

// Get all products with filters
export const getProducts = async (filters) => {
    try {
        const response = await axios.get(`${API_URL}/api/products`, { params: filters });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get product by ID
export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/api/products/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get similar products
export const getSimilarProducts = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/api/products/similar/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get best sellers
export const getBestSellers = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/products/best-sellers`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get new arrivals
export const getNewArrivals = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/products/new-arrivals`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}; 