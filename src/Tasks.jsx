import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Tasks = (props) => {
  const { tasks, statusLabel, displayName } = props;
  const filtered = tasks.filter((task) => task.status === statusLabel);

  return (
    <div className="mb-4">
      <h4>{displayName}</h4>
      <ul className="list-group">
        {filtered.length === 0 ? (
          <li className="list-group-item text-muted text-center">No {displayName.toLowerCase()}.</li>
        ) : (
          filtered.map((task, index) => {
            const globalIndex = tasks.findIndex((t) => t.text === task.text && t.status === task.status);
            return (
              <li
                key={globalIndex}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {task.text}
                {/* <div className="d-flex align-items-center gap-2">
                  <select
                    className="form-select form-select-sm me-2"
                    value={task.status}
                    onChange={(e) => changeStatus(globalIndex, e.target.value)}
                  >
                    <option value="todo">Tasks</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                  </select>
                  <button className="btn btn-sm btn-warning" onClick={() => handleEdit(globalIndex)}>
                    <FaEdit />
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(globalIndex)}>
                    <FaTrash />
                  </button>
                </div> */}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

export default Tasks;