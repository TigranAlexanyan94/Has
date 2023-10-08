import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { FIELDS } from "../../../constants/categoryFormField";
import { Button } from "@mui/material";
import { NOOP, FileRead } from "../../../libs/utils";
import "./ProductModal.less";

const ProductModal = (props) => {
  const { active, onClose, onSave, editProduct, allCategory } = props;
  
  const formik = useFormik({
    initialValues: {
      [FIELDS.NAME]: editProduct ? editProduct.name : '',
      [FIELDS.IMAGE]: editProduct ? editProduct.imageUrl : '',
      [FIELDS.PRICE]: editProduct ? editProduct.price : '',
      [FIELDS.DESCRIPTION]: editProduct ? editProduct.description : '',
      [FIELDS.STATUS]: editProduct ? editProduct.status : '',
      [FIELDS.CATEGORYID]: editProduct ? editProduct.categoryId : '',
    },

    onSubmit: async (values) => {
      const getBase64Hash = await FileRead(values.image);
      const { name, price, description, status, categoryId, image } = values;
      onSave(name, getBase64Hash, Number(price), description, status, categoryId, image);
      onClose();
    },
  });

  const { handleSubmit, handleChange, setFieldValue, values } = formik;

  return (
    <div className={active ? "modal active" : "modal"} onClick={() => onClose()}>
      <div
        style={{ backgroundColor: "white" }}
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="ProductForm">
          <input
            className="productField"
            name="name"
            type="text"
            placeholder="Product name"
            value={values[FIELDS.NAME]}
            onChange={handleChange}
          />

          <input 
            type="file" 
            id="upload" 
            hidden accept="image/*" 
            name="image_url"
            onChange={(e) => { setFieldValue("image", e.currentTarget.files[0] ); }} />
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
            <label id="label" htmlFor="upload"> Choose file </label>
            {values[FIELDS.IMAGE] && <img src={values[FIELDS.IMAGE]} alt="" style={{ width: "45px", height: "35px" }} />}
          </div>

          <input
            className="productField"
            name="price"
            type="text"
            placeholder="Product price"
            value={values[FIELDS.PRICE]}
            onChange={handleChange}
          />
          <input
            className="productField"
            name="description"
            type="text"
            placeholder="Product description"
            value={values[FIELDS.DESCRIPTION]}
            maxLength={70}
            onChange={handleChange}
          />
          <select
            name="status"
            value={values[FIELDS.STATUS]}
            onChange={handleChange}
          >
            <option>Please choose an status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            name="categoryId"
            value={values[FIELDS.CATEGORYID]}
            onChange={handleChange}
          >
            <option>Please choose an category</option>
            {allCategory.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" color="error" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button variant="outlined" type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProductModal.propTypes = {
  active: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
};

ProductModal.defaultProps = {
  active: false,
  onClose: NOOP,
  onSave: NOOP,
};

export default ProductModal;
