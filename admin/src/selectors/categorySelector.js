import { createSelector } from "reselect";

export const selectCategoryItems = (state) => {
  const categoryAndCurrentData = state.category;
  return categoryAndCurrentData;
};

export const selectChildCategories = createSelector(
  selectCategoryItems,
  ({ data, current }) => {
    const childCategory = current
      ? Object.values(data).filter(({ parentId }) => parentId === current?.id)
      : [];
    return childCategory;
  }
);

export const selectTopLevelCategories = createSelector(
  selectCategoryItems,
  ({ data }) => {
    return Object.values(data).filter(({ parentId }) => parentId === null);
  }
);

export const selectAllCategories = createSelector(
  selectCategoryItems,
  ({ data }) => {
    return Object.values(data);
  }
);

export const selectCurrentCategory = createSelector(
  selectCategoryItems,
  ({ current }) => current
);
