import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RestaurantPage from './containers/restaurantPage/RestaurantPage';
import MusicHallPage from './containers/musicHallPage/MusicHallPage';
import BarPage from './containers/barPage/BarPage';
import CategoriesPage from './containers/categoriesPage/CategoriesPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<CategoriesPage />} />
      <Route path="/event" element={<MusicHallPage />} />
      <Route path="/bar" element={<BarPage />} />
      <Route path="/restaurant" element={<RestaurantPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
