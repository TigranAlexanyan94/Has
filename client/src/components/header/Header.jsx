import AraksLogo from '../../assets/logo/araksLogo.svg';
import './Header.css';

const Header = ({ title }) => (
  <div className="header">
    <div className="logo">
      <img src={AraksLogo} alt="Logo" />
    </div>
    <div className="title">
      <h1>{title}</h1>
      <hr />
    </div>
    <div className="info">
      <p>Tel: 000</p>
    </div>
  </div>
);

export default Header;
