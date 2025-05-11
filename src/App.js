import React, { useState, useEffect } from 'react';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tasks'));
    if (stored) setTasks(stored);
  }, []);

  // Save tasks to localStorage on update
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add or update task
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

  // Delete task
  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    if (editIndex === index) setEditIndex(null);
  };

  // Edit task (load into input)
  const handleEdit = (index) => {
    setInput(tasks[index].text);
    setEditIndex(index);
  };

  // Change task status
  const changeStatus = (index, newStatus) => {
    const updated = [...tasks];
    updated[index].status = newStatus;
    setTasks(updated);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="text-center mb-4">📝 Naiza Task Manager</h2>

          {/* Add/Edit Task Form */}
          <AddTask
            input={input}
            setInput={setInput}
            handleAddTask={handleAddTask}
            editIndex={editIndex}
          />

          {/* Task Columns */}
          <Tasks
            tasks={tasks}
            statusLabel="todo"
            displayName="Tasks"
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            changeStatus={changeStatus}
          />
          <Tasks
            tasks={tasks}
            statusLabel="doing"
            displayName="Doing"
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            changeStatus={changeStatus}
          />
          <Tasks
            tasks={tasks}
            statusLabel="done"
            displayName="Done"
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            changeStatus={changeStatus}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
