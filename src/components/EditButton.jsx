import React from 'react';
import PropTypes from 'prop-types';

const EditButton = ({ onEdit }) => (
  <button className="btn btn-sm btn-primary me-2" onClick={onEdit}>
    ✏️ Edit
  </button>
);

EditButton.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

export default EditButton;
