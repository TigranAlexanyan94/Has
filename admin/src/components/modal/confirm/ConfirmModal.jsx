import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { NOOP } from "../../../libs/utils";
import "./ConfirmModal.less";

const ConfirmModal = (props) => {
  const { active, onClose, onDelete, children } = props;

  return (
    <div className={active ? "modal active" : "modal"} onClick={() => onClose()}>
      <div
        style={{ backgroundColor: "white" }}
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}>
        <div>{children}</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" color="error" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button variant="outlined"
            onClick={onDelete}>
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};

ConfirmModal.propTypes = {
  active: PropTypes.bool,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
};

ConfirmModal.defaultProps = {
  active: false,
  onClose: NOOP,
  onDelete: NOOP,
};

export default ConfirmModal;
