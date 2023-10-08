import { createSelector } from "reselect";

export const selectProductItems = (state) => {
  const productData = state.product;
  return productData;
};

export const selectProduct = createSelector(
  selectProductItems, 
  ({ data }) => {
    return data;
  }
);
