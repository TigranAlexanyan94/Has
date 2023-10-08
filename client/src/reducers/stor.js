import { combineReducers, configureStore } from '@reduxjs/toolkit';
import categorySlice from './categoriesSlice';
import productsSlice from './productsSlice';
import eventsSlice from './eventsSlice';

const rootReducer = combineReducers({
  category: categorySlice,
  product: productsSlice,
  event: eventsSlice,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
