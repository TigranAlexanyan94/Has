import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { genericRequest } from "../../api/genericRequest";
import { headers } from "../../constants/Headers";

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async () => {
    const response = await fetch(`${process.env.API_URL}/category`);
    return response.json();
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (data) => {
    const response = await fetch(
      `${process.env.API_URL}/category`,
      genericRequest("POST", headers, JSON.stringify(data))
    );
    return response.json();
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (data) => {
    const { id } = data;
    const response = await fetch(
      `${process.env.API_URL}/category/${id}`,
      genericRequest("DELETE", headers)
    );
    return response.json();
  }
);

export const editCategory = createAsyncThunk(
  "category/editCategory",
  async (data) => {
    const { id, name } = data;
    const response = await fetch(
      `${process.env.API_URL}/category/${id}`,
      genericRequest("PUT", headers, JSON.stringify({ name }))
    );
    return response.json();
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: { data: {}, current: null },
  reducers: {
    setCurrentCategory: (state, { payload }) => {
      if (payload) {
        state.current = payload;
      } else {
        state.current = !!state?.current?.parentId
          ? state.data[state?.current?.parentId]
          : null;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCategory.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        const { payload } = action;
        state.data = { ...state.data, [payload.data.id]: payload.data };

        if (payload.data.parentId) {
          if (state.data[payload.data.parentId].sub)
            state.data[payload.data.parentId].sub.push(payload.data);
          else {
            state.data[payload.data.parentId] = {
              ...state.data[payload.data.parentId],
              sub: [payload.data],
            };
          }
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        const { payload } = action;
        state.data = Object.values({ ...state.data }).filter(
          ({ id }) => id != payload.data.id
        );
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        const { payload } = action;
        state.data[payload.data.id].name = payload.data.name;
      });
  },
});

export const { setCurrentCategory } = categorySlice.actions;
export default categorySlice.reducer;
