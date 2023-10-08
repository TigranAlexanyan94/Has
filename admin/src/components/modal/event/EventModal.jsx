import React from "react";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import { FIELDS } from "../../../constants/categoryFormField";
import { Button } from "@mui/material";
import { NOOP, FileRead } from "../../../libs/utils";
import "./EventModal.less";

const EventModal = (props) => {
  const { active, onClose, onSave, editEvent } = props;

  const formik = useFormik({
    initialValues: {
      [FIELDS.NAME]: editEvent ? editEvent.name : '',
      [FIELDS.IMAGE]: editEvent ? editEvent.imageUrl : '',
      [FIELDS.DESCRIPTION]: editEvent ? editEvent.description : '',
      [FIELDS.DATE]: editEvent ? editEvent.dateString : '',
      [FIELDS.STATUS]: editEvent ? editEvent.status : '',
      [FIELDS.REPEAT]: editEvent ? editEvent.repeat : ''
    },

    onSubmit: async (values) => {
      const getBase64Hash = await FileRead(values.image);
      const myDate = values.date;
      const date = new Date(myDate);
      const timestamp = String(date.getTime());
      const { name, description, status, repeat } = values;
      onSave(name, getBase64Hash, description, timestamp, status, repeat);
      onClose();

      FileRead(values.image);
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
        <form onSubmit={handleSubmit} className="EventForm">
          <input
            className="eventField"
            name="name"
            type="text"
            placeholder="Event name"
            value={values[FIELDS.NAME]}
            onChange={handleChange}
          />
          <input
            type="file"
            id="upload"
            hidden accept="image/*"
            name="image_url"
            onChange={(e) => { setFieldValue("image", e.currentTarget.files[0]); }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label id="label" htmlFor="upload"> Choose file </label>
            {values[FIELDS.IMAGE] && <img src={values[FIELDS.IMAGE]} alt="" style={{ width: "45px", height: "35px" }} />}
          </div>

          <input
            className="eventField"
            name="description"
            type="text"
            placeholder="Event description"
            value={values[FIELDS.DESCRIPTION]}
            maxLength={65}
            onChange={handleChange}
          />
          <input
            className="eventField"
            name="date"
            type="date"
            value={values[FIELDS.DATE]}
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
            name="repeat"
            value={values[FIELDS.REPEAT]}
            onChange={handleChange}
          >
            <option>Please choose an repeat</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
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

EventModal.propTypes = {
  active: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
};

EventModal.defaultProps = {
  active: false,
  onClose: NOOP,
  onSave: NOOP,
};

export default EventModal;
