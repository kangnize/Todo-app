import React from "react";
import PropTypes from "prop-types";

const DeleteButton = ({ onDelete }) => (
  <button className="btn btn-sm btn-danger me-2" onClick={onDelete}>
    🗑️ Delete
  </button>
);

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
