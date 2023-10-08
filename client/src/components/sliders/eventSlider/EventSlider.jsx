import Slider from 'react-slick';
import NextBtn from '../../buttons/PrevNextButton/NextButton';
import PrevBtn from '../../buttons/PrevNextButton/PrevButton';
import './EventSlider.css';
import EventCard from '../../cards/event/EventCard';

const settings = {
  className: 'prev-next',
  centerMode: true,
  infinite: true,
  centerPadding: '0px',
  slidesToShow: 3,
  speed: 1000,
  nextArrow: (
    <div>
      <NextBtn />
    </div>
  ),
  prevArrow: (
    <div>
      <PrevBtn />
    </div>
  ),
};

const EventSlider = ({ items }) => (
  <Slider {...settings}>
    {items.map((item) => (
      <div className="event">
        <EventCard {...item} />
      </div>
    ))}
  </Slider>
);

export default EventSlider;
