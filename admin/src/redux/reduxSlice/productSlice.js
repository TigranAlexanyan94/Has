import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { genericRequest } from "../../api/genericRequest";
import { headers } from "../../constants/Headers";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async () => {
    const response = await fetch(`${process.env.API_URL}/product`, { headers });
    return response.json();
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (data) => {
    const response = await fetch(
      `${process.env.API_URL}/product`,
      genericRequest("POST", headers, JSON.stringify(data))
    );
    return response.json();
  }
);

export const editProduct = createAsyncThunk(
  "product/editProduct",
  async (data) => {
    const { id, name, imageUrl, price, description, status, categoryId } = data;
    const response = await fetch(
      `${process.env.API_URL}/product/${id}`,
      genericRequest("PUT", headers, JSON.stringify({ name, imageUrl, price, description, status, categoryId }))
    );
    return response.json();
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (data) => {
    const { id } = data;
    const response = await fetch(
      `${process.env.API_URL}/product/${id}`,
      genericRequest("DELETE", headers)
    );
    return response.json();
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: { data: [] },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        const { payload } = action;
        state.data = [...state.data, payload.data ];
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const { payload } = action;
        state.data = state.data.filter(
          ({ id }) => id != payload.data.productId
        );
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const { payload } = action;
        state.data = state.data.map(item => {
          if(item.id == payload.data.id){
            return {...item, name: payload.data.name, imageUrl: payload.data.imageUrl,
              price: payload.data.price, description: payload.data.description, status: 
              payload.data.status, categoryId: payload.data.categoryId
            }
          }
          return item;
        })
      });
  },
});

export default productSlice.reducer;
