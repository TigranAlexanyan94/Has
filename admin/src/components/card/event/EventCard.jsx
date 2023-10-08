import React from "react";
import PropTypes from 'prop-types';
import moment from 'moment';
import { Button } from "@mui/material";
import { NOOP } from "../../../libs/utils";
import "./EventCard.less";

const EventCard = (props) => {
  const { id, title, image, description, date, status, repeat, onDeleteClick, onEditClick } = props;
  return (
    <div key={id} className="EventCard">
      <div className="image">
        <img src={`${image}`} style={{ width: "30px", height: "30px"}} />
      </div>
      <div className="title">{title}</div>
      <div className="date">{moment(Number(date)).format('MMM Do YY')}</div>
      <div className="description">{description}</div>
      <div className="status">{status}</div>
      <div className="repeat">{repeat}</div>
      <div className="buttons">
        <div><Button variant="outlined" id={id} onClick={onEditClick}>EDIT</Button></div>
        <div><Button variant="outlined" color="error" id={id} onClick={onDeleteClick}>DELETE</Button></div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  status: PropTypes.string,
  repeat: PropTypes.string,
  onDeleteClick: PropTypes.func,
  onEditClick: PropTypes.func,
};

EventCard.defaultProps = {
  id: 0,
  title: '',
  image: '',
  description: '',
  date: '',
  status: '',
  repeat: '',
  onDeleteClick: NOOP,
  onEditClick: NOOP,
};

export default EventCard;
