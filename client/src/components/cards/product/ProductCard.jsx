import PropTypes from 'prop-types';
import './ProductCard.css';

const ProductCard = ({
  description, name, price, imageUrl, altImg,
}) => (
  <div className="card">
    <img src={imageUrl} alt={altImg} />
    <div className="info">
      <p className="price">{price}</p>
      <h2>{name}</h2>
      <hr />
      <div className="discription">
        <p>{description}</p>
      </div>
    </div>
  </div>
);

ProductCard.propTypes = {
  description: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  imageUrl: PropTypes.string,
  altImg: PropTypes.string,
};

ProductCard.defaultProps = {
  description: '',
  name: '',
  price: '',
  imageUrl: '',
  altImg: '',
};

export default ProductCard;
