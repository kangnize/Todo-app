import React from 'react';
import { FaPlus, FaEdit } from 'react-icons/fa';
import '../App.css';

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
        <button className="btn btn-primary" onClick={handleAddTask}>
          {!!editIndex ? <FaEdit /> : <FaPlus />}
        </button>
      </div>
    </div>
  )
}

export default AddTask;