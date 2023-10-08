import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CLIENT_API } from '../constants/constant';

export const getCategories = createAsyncThunk('categories', async () => {
  const data = await fetch(`${CLIENT_API}/category`);
  return data.json();
});

const categorySlice = createSlice({
  name: 'category',
  initialState: { data: {} },

  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default categorySlice.reducer;
