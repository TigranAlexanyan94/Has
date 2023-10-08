import PropTypes from 'prop-types';
import 'slick-carousel/slick/slick.css';
import './UpDownSlider.css';
import Slider from 'react-slick';
import UpBtn from '../../buttons/UpDownButton/UpButton';
import DownBtn from '../../buttons/UpDownButton/DownButton';
import '@fontsource/montserrat';
import categoriesObjectSchemas from '../../schema/objectSchemas';

const UpDownSlider = ({ items, onChangeSlide }) => {
  const settings = {
    className: 'up-down',
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    prevArrow: (
      <div>
        <UpBtn />
      </div>
    ),
    nextArrow: (
      <div>
        <DownBtn />
      </div>
    ),
    afterChange: (index) => {
      onChangeSlide(items[index].id);
    },
  };

  return (
    <div>
      <div className="slick-slider">
        <Slider {...settings}>
          {items.map((item) => (
            <div className="title">
              <div>
                <h3>{item.name}</h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

UpDownSlider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(categoriesObjectSchemas)),
};

UpDownSlider.defaultProps = {
  items: [],
};

export default UpDownSlider;
