import { createSelector } from 'reselect';

const selectProducts = (stete) => stete.product;
const productsData = createSelector(selectProducts, (product) => product?.data?.products);

export default productsData;
