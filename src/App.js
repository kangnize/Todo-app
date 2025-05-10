import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Tasks from './Tasks';
import AddTask from './AddTask';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tasks'));
    if (stored) setTasks(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!input.trim()) return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex].text = input;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: input, status: 'todo' }]);
    }
    setInput('');
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    if (editIndex === index) setEditIndex(null); // Reset edit state if deleting edited task
  };

  const handleEdit = (index) => {
    setInput(tasks[index].text);
    setEditIndex(index);
  };

  const changeStatus = (index, newStatus) => {
    const updated = [...tasks];
    updated[index].status = newStatus;
    setTasks(updated);
  };

  const renderTasks = (statusLabel, displayName) => {
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
                  <div className="d-flex align-items-center gap-2">
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
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    );
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="text-center mb-4">📝 Naiza Task Manager</h2>

          <AddTask
            input={input}
            setInput={setInput}
            handleAddTask={handleAddTask}
            editIndex={editIndex}
          />

					<Tasks tasks={tasks} statusLabel="todo" displayName="Tasks" />
					<Tasks tasks={tasks} statusLabel="doing" displayName="Doing" />
					<Tasks tasks={tasks} statusLabel="done" displayName="Done" />
        </div>
      </div>
    </div>
  );
}

export default App;
