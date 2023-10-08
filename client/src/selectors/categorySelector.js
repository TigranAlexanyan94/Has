import { createSelector } from 'reselect';

const selectCategorys = (stete) => stete.category;
const categoriesData = createSelector(selectCategorys, ({ data }) => {
  const dataValuse = Object.values(data);
  return dataValuse;
});

export default categoriesData;
