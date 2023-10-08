import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './MusicHallPage.css';
import Header from '../../components/header/Header';
import BackButton from '../../components/buttons/backButton/BackButton';
import LanguageButton from '../../components/buttons/languageButton/LanguageButton';
import EventSlider from '../../components/sliders/eventSlider/EventSlider';
import eventsData from '../../selectors/eventSelector';
import { getEvents } from '../../reducers/eventsSlice';

const MusicHallPage = () => {
  const dispatch = useDispatch();
  const events = useSelector(eventsData);
  useEffect(() => {
    dispatch(getEvents());
  }, []);
  if (!events) {
    return null;
  }
  return (
    <div className="music-hall-page">
      <div className="main">
        <Header title="MUSIC HALL" />
        <EventSlider items={events} />
        <div className="footer">
          <Link to="/">
            <BackButton />
          </Link>
          <LanguageButton />
        </div>
      </div>
    </div>
  );
};

export default MusicHallPage;
