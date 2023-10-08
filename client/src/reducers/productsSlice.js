import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CLIENT_API } from '../constants/constant';

export const getProductsById = createAsyncThunk('products', async (id) => {
  const data = await fetch(`${CLIENT_API}/product/${id}`);
  return data.json();
});

const categorySlice = createSlice({
  name: 'product',
  initialState: {},

  extraReducers: (builder) => {
    builder.addCase(getProductsById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getProductsById.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
  },
});

export default categorySlice.reducer;
