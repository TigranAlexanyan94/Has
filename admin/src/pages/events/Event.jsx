import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';
import {
  getEvent,
  addEvent,
  deleteEvent,
  editEvent,
} from "../../redux/reduxSlice/eventSlice";
import { selectEvent } from "../../selectors/eventSelector";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EventCard from "../../components/card/event/EventCard";
import EventModal from "../../components/modal/event/EventModal";
import ConfirmModal from "../../components/modal/confirm/ConfirmModal";
import "./Event.less";

const Events = () => {
  const [openModal, setOpenModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState({});
  const [query, setQuery] = useState('');

  const [eventToBeEdit, setEventToBeEdit] = useState(null);
  const dispatch = useDispatch();
  const event = useSelector(selectEvent);

  useEffect(() => {
    dispatch(getEvent());
  }, []);

  const onAddClick = () => {
    setOpenModal(true);
  };

  const onDeleteClick = (item) => {
    setConfirmModal(true);
    setDeleteItem(item);
  };

  const onEditClick = (item) => {
    const dateString = moment(Number(item.date)).format("YYYY-M-DD");
    setEventToBeEdit({...item, dateString });
    setOpenModal(true);
  };

  const handleEventSave = (name, imageUrl, description, date, status, repeat) => {
    if (!eventToBeEdit) {
      dispatch(
        addEvent({
          name,
          imageUrl,
          description,
          date,
          status,
          repeat,
        })
      );
    } else {
      dispatch(editEvent({
        name, imageUrl, description, date, status, repeat,
        id: eventToBeEdit.id
      }));
    }
  };

  const handleOnModalClose = () => {
    setOpenModal(false);
    setEventToBeEdit(null);
  };

  const handleOnConfirmModalClose = () => {
    setConfirmModal(false);
  };

  const handleOnDelete = () => {
    setConfirmModal(false);
    dispatch(deleteEvent(deleteItem));
  };

  const searchEventByName = (event) => {
    if (query == '') {
      return event;
    }
    if (event.name.toLowerCase().includes(query.toLowerCase())) {
      return event;
    }
  };

  return (
    <div style={{ margin: "0 auto" }}>
    <div className="Event">
      <div className="header">
        Event
      </div>
      <div className="addButton">
        <input type="text" className="search" placeholder="Search event"
          onChange={e => setQuery(e.target.value)} />
        <Button variant="outlined" startIcon={<AddIcon />} onClick={onAddClick}>
          ADD Event
        </Button>
      </div>
      <div style={{ display: "flex", marginTop: "20px" }}>
        <div style={{ width: "6%" }}>Image</div>
        <div style={{ width: "7%" }}>Name</div>
        <div style={{ width: "9%" }}>Date</div>
        <div style={{ width: "46%" }}>Description</div>
        <div style={{ width: "5%" }}>Status</div>
        <div>Repeat</div>
      </div>
      {event.filter((val) => searchEventByName(val)).map((item) => {
        return (
          <EventCard
            key={item.id}
            title={item.name}
            id={item.id}
            image={item.imageUrl}
            description={item.description}
            date={item.date}
            status={item.status}
            repeat={item.repeat}
            onDeleteClick={() => onDeleteClick(item)}
            onEditClick={() => onEditClick(item)}
          />
        );
      })}
         
      {openModal && <EventModal
        active={openModal}
        onSave={handleEventSave}
        onClose={handleOnModalClose}
        editEvent={eventToBeEdit}
      />}

      {confirmModal && <ConfirmModal
        active={confirmModal}
        onClose={handleOnConfirmModalClose}
        onDelete={handleOnDelete}
      >
        <p>Are you sure you want to delete this event?</p>
      </ConfirmModal>}
    </div>
    </div>
  );
};

export default Events;
