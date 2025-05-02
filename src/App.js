import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTask = () => {
    if (!input.trim()) return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = input;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, input]);
    }
    setInput('');
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEditTask = (index) => {
    setInput(tasks[index]);
    setEditIndex(index);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">📝 My To-Do List</h2>

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your task"
            />
            <button
              className="btn btn-primary"
              onClick={handleAddTask}
            >
              {editIndex !== null ? 'Update' : 'Add'}
            </button>
          </div>

          <ul className="list-group">
            {tasks.map((task, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {task}
                <div>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEditTask(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteTask(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
            {tasks.length === 0 && <li className="list-group-item text-center text-muted">No tasks yet.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
