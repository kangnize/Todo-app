// src/components/Tasks.js

import React from 'react';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import StatusButton from './StatusButton'; // optional
import PropTypes from 'prop-types';

const Tasks = ({ tasks, statusLabel, displayName, handleEdit, handleDelete, changeStatus }) => {
  const filtered = tasks.filter(task => task.status === statusLabel);

  return (
    <div className="mt-4">
      <h4>{displayName}</h4>
      <ul className="list-group">
        {filtered.map((task, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{task.text}</span>
            <div className="btn-group">
              <EditButton onEdit={() => handleEdit(index)} />
              <DeleteButton onDelete={() => handleDelete(index)} />
              <StatusButton
                currentStatus={task.status}
                onChange={(newStatus) => changeStatus(index, newStatus)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  statusLabel: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
};

export default Tasks;
