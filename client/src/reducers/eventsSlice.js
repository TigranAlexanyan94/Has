import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CLIENT_API } from '../constants/constant';

export const getEvents = createAsyncThunk('events', async () => {
  const data = await fetch(`${CLIENT_API}/event`);
  return data.json();
});

const eventsSlice = createSlice({
  name: 'event',
  initialState: {},

  extraReducers: (builder) => {
    builder.addCase(getEvents.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default eventsSlice.reducer;
