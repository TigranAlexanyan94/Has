import Slider from 'react-slick';
import NextBtn from '../../buttons/PrevNextButton/NextButton';
import PrevBtn from '../../buttons/PrevNextButton/PrevButton';
import './PrevNextSlider.css';
import ProductCard from '../../cards/product/ProductCard';

const settings = {
  className: 'prev-next',
  centerMode: true,
  infinite: true,
  centerPadding: '0px',
  slidesToShow: 5,
  slidesToScroll: 1,
  speed: 1300,
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

const PrevNextSlider = ({ items }) => (
  <Slider {...settings}>
    {items.map((item) => (
      <div>
        <ProductCard {...item} />
      </div>
    ))}
  </Slider>
);

export default PrevNextSlider;
