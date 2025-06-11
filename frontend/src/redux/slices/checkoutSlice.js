import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to create a checkout session
export const createCheckoutSession = createAsyncThunk(
  "checkout/createCheckoutSession",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/checkout`, // ✅ Sửa từ /api/orders thành /api/checkout
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken") || localStorage.getItem("token")
              }`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Unknown error"
      );
    }
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: null,
    loading: false,
    error: null,
    sessionId: null,
  },
  reducers: {
    clearCheckout: (state) => {
      state.checkout = null;
      state.sessionId = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCheckoutSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
        state.sessionId = action.payload._id;
      })
      .addCase(createCheckoutSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create order";
      });
  },
});

export const { clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;