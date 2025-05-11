import React from 'react';
import PropTypes from 'prop-types';

const StatusButton = ({ currentStatus, onChange }) => {
  const getNextStatus = (status) => {
    if (status === 'todo') return 'doing';
    if (status === 'doing') return 'done';
    return 'todo';
  };

  return (
    <button className="btn btn-sm btn-secondary" onClick={() => onChange(getNextStatus(currentStatus))}>
      {getNextStatus(currentStatus)}
    </button>
  );
};

StatusButton.propTypes = {
  currentStatus: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StatusButton;
