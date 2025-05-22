// src/components/Tasks.js

import React from "react";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import StatusButton from "./StatusButton";
import PropTypes from "prop-types";

const Tasks = ({
  tasks,
  statusLabel,
  displayName,
  handleEdit,
  handleDelete,
  changeStatus,
  toggleFavourite, // ✅ Accept it here
}) => {
  return (
    <div className="mt-4">
      <h4>{displayName}</h4>
      <ul className="list-group">
        {tasks.map((task, index) => {
          if (task.status !== statusLabel) return null;

          return (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span
                className={task.status === "done" ? "completed-task" : ""}
                onClick={() =>
                  changeStatus(index, task.status === "done" ? "todo" : "done")
                }
                style={{ cursor: "pointer" }}
              >
                {task.text}
              </span>

              <div className="btn-group">
                <EditButton onEdit={() => handleEdit(index)} />
                <DeleteButton onDelete={() => handleDelete(index)} />
                <StatusButton
                  currentStatus={task.status}
                  onChange={(newStatus) => changeStatus(index, newStatus)}
                />
              </div>

              <button
                className="btn btn-sm"
                onClick={() => toggleFavourite(index)}
                title={task.favourite ? "Unfavourite" : "Favourite"}
              >
                <i
                  className={
                    task.favourite ? "fas fa-star text-warning" : "far fa-star"
                  }
                  style={{ fontSize: "1.2rem" }}
                ></i>
              </button>
            </li>
          );
        })}
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
  toggleFavourite: PropTypes.func.isRequired, // ✅ Add to PropTypes
};

export default Tasks;
