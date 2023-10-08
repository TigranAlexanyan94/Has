import { createSelector } from "reselect";

export const selectEventItems = (state) => {
  const eventData = state.event;
  return eventData;
};

export const selectEvent = createSelector(
  selectEventItems, 
  ({ data }) => {
    return data;
  }
);
