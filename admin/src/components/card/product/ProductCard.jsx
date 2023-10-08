import React from "react";
import PropTypes from 'prop-types';
import { Button } from "@mui/material";
import { NOOP } from "../../../libs/utils";
import "./ProductCard.less";

const ProductCard = (props) => {
  const { id, title, image, description, price, status, onDeleteClick, onEditClick } = props;
  return (
    <div key={id} className="ProductCard">
      <div className="image">
        <img src={`${image}`} style={{ width: "30px", height: "30px"}} />
      </div>
      <div className="title">{title}</div>
      <div className="price">{price}</div>
      <div className="description">{description}</div>
      <div className="status">{status}</div>
      <div className="buttons">
        <div><Button variant="outlined" id={id} onClick={onEditClick}>EDIT</Button></div>
        <div><Button variant="outlined" color="error" id={id} onClick={onDeleteClick}>DELETE</Button></div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
  fileType: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  status: PropTypes.string,
  onDeleteClick: PropTypes.func,
  onEditClick: PropTypes.func,
};

ProductCard.defaultProps = {
  id: 0,
  title: '',
  image: '',
  fileType: '',
  description: '',
  price: 0,
  status: '',
  onDeleteClick: NOOP,
  onEditClick: NOOP,
};

export default ProductCard;
