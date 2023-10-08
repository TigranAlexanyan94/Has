import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { FIELDS } from "../../../constants/categoryFormField"
import { Button } from "@mui/material";
import { NOOP } from "../../../libs/utils";
import "./CategoryModal.less";

const CategoryModal = (props) => {
  const { active, onClose, onSave, editCategory } = props;

  const formik = useFormik({
    initialValues: {
      [FIELDS.NAME]: !!editCategory ? editCategory.name : '',
    },

    onSubmit: (values) => {
      const { name } = values;
      onSave(name);
      onClose();
    },
  });

  const { handleSubmit, handleChange, values } = formik;

  return (
    <div className={active ? "modal active" : "modal"} onClick={() => onClose()}>
      <div
        style={{ backgroundColor: "white" }}
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <input
            id="categoryField"
            name="name"
            type="text"
            placeholder="Category name"
            value={values[FIELDS.NAME]}
            onChange={handleChange}
          />
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

CategoryModal.propTypes = {
  active: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
};

CategoryModal.defaultProps = {
  active: false,
  onClose: NOOP,
  onSave: NOOP,
};

export default CategoryModal;
