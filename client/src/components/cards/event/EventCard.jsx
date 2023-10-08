import moment from 'moment';
import './EventCard.css';
// import eventImg from '../../../assets/images/event_1.jpg';

const EventCard = ({
  name, description, imageUrl, date,
}) => (
  <div className="event-card">
    <img src={imageUrl} alt="alt img" />
    <div className="event-info">
      <h2>{name}</h2>
      <div className="description">
        <p>{description}</p>
        <p className="music-type">#jazz #sing #bulki</p>
      </div>
      <div className="day-time">
        <div className="day"><h3>{moment(date.number).format('MM.DD.YY')}</h3></div>
        <div className="time"><h3>{moment(date.number).format('h:mm')}</h3></div>
      </div>
    </div>
  </div>
);

export default EventCard;
