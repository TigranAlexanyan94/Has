import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { genericRequest } from "../../api/genericRequest";
import { headers } from "../../constants/Headers";

export const getEvent = createAsyncThunk("event/getEvents", async () => {
  const response = await fetch(`${process.env.API_URL}/event`);
  return response.json();
});

export const addEvent = createAsyncThunk("event/addEvent", async (data) => {
  const response = await fetch(
    `${process.env.API_URL}/event`,
    genericRequest("POST", headers, JSON.stringify(data))
  );
  return response.json();
});

export const editEvent = createAsyncThunk("event/editEvent", async (data) => {
  const { id, name, imageUrl, description, date, status, repeat } = data;
  const response = await fetch(
    `${process.env.API_URL}/event/${id}`,
    genericRequest(
      "PUT",
      headers,
      JSON.stringify({ name, imageUrl, description, date, status, repeat })
    )
  );
  return response.json();
});

export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async (data) => {
    const { id } = data;
    const response = await fetch(
      `${process.env.API_URL}/event/${id}`,
      genericRequest("DELETE", headers)
    );
    return response.json();
  }
);

export const eventSlice = createSlice({
  name: "event",
  initialState: { data: [] },
  extraReducers: (builder) => {
    builder
      .addCase(getEvent.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        const { payload } = action;
        state.data = [...state.data, payload.data];
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        const { payload } = action;
        state.data = state.data.filter(({ id }) => id != payload.data.eventId);
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        const { payload } = action;
        state.data = state.data.map((item) => {
          if (item.id == payload.data.id) {
            return {
              ...item,
              name: payload.data.name,
              imageUrl: payload.data.imageUrl,
              description: payload.data.description,
              status: payload.data.status,
              date: payload.data.date,
              repeat: payload.data.repeat,
            };
          }
          return item;
        });
      });
  },
});

export default eventSlice.reducer;
