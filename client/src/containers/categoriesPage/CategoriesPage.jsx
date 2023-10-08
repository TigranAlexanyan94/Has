import { Link } from 'react-router-dom';
import './CategoriesPage.css';
import AraksLogo from '../../assets/logo/araksLogo.svg';
import MusicHallIcon from '../../assets/logo/icon-music-hall.svg';
import RestaurantIcon from '../../assets/logo/icon-resturant.svg';
import BarIcon from '../../assets/logo/icon-bar.svg';
import { RESTAURANT, MUSICHALL, BAR } from '../../constants/constant';

const CategoriesPage = () => (
  <div className="categories-page">
    <div className="main">
      <Link to="/event">
        <div className="music-hall">
          <h1>{MUSICHALL}</h1>
          <div className="icon">
            <hr />
            <img src={MusicHallIcon} alt="icon" />
            <hr />
          </div>
        </div>
      </Link>
      <div className="logo">
        <img src={AraksLogo} alt="Logo" />
      </div>
      <Link to="/bar">
        <div className="bar">
          <h1>{BAR}</h1>
          <div className="icon">
            <hr />
            <img src={BarIcon} alt="icon" />
            <hr />
          </div>
        </div>
      </Link>

      <Link to="/restaurant">
        <div className="resturant">
          <h1>{RESTAURANT}</h1>
          <div className="icon">
            <hr />
            <img src={RestaurantIcon} alt="icon" />
            <hr />
          </div>
        </div>
      </Link>
    </div>
  </div>
);

export default CategoriesPage;
