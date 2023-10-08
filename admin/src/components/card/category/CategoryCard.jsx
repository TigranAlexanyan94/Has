import React from "react";
import PropTypes from 'prop-types';
import { Button } from "@mui/material";
import { NOOP } from "../../../libs/utils";
import "./CategoryCard.less";

const CategoryCard = (props) => {
  const { id, title, onCategoryClick, onDeleteClick, onEditClick, subItemsLength } = props;
  return (
    <div key={id} className="CategoryCard">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="title"><p id={id} onClick={onCategoryClick}>{title}</p></div>
        <div className="sub">{subItemsLength}</div>
      </div>
      <div className="buttons">
        <div><Button variant="outlined" id={id} onClick={onEditClick}>EDIT</Button></div>
        <div><Button variant="outlined" color="error" id={id} onClick={onDeleteClick}>DELETE</Button></div>
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  onCategoryClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onEditClick: PropTypes.func,
  subItemsLength: PropTypes.number,
};

CategoryCard.defaultProps = {
  id: 0,
  title: '',
  onCategoryClick: NOOP,
  onDeleteClick: NOOP,
  onEditClick: NOOP,
  subItemsLength: 0,
};


export default CategoryCard;
