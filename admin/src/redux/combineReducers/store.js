import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categorySlice from '../reduxSlice/categorySlice';
import eventSlice from '../reduxSlice/eventSlice';
import productSlice from '../reduxSlice/productSlice';

const rootReducer = combineReducers({
  category: categorySlice,
  product: productSlice,
  event: eventSlice,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store;
