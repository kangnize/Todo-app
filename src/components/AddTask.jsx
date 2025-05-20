import React from "react";
import { FaPlus, FaEdit } from "react-icons/fa";
import "../App.css";

const AddTask = (props) => {
  const { input, setInput, handleAddTask, editIndex } = props;

  return (
    <div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddTask}>
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </div>
      
    </div>
    
  );
};

export default AddTask;
