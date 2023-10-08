import { createSelector } from 'reselect';

const selectEvents = (stete) => stete.event;
const eventsData = createSelector(selectEvents, (event) => event.data);

export default eventsData;
