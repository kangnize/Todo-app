import React, { useState, useEffect } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'completed', 'incomplete'

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tasks"));
    if (stored) setTasks(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!input.trim()) return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex].text = input;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: input, status: "todo" }]);
    }

    setInput("");
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    if (editIndex === index) setEditIndex(null);
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

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.status === "done";
    if (filter === "incomplete") return task.status !== "done";
    return true; // 'all'
  });

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

          {/* Filter Buttons */}
          <div className="mb-3 text-center">
            <button className="btn btn-outline-primary mx-1" onClick={() => setFilter("all")}>
              All
            </button>
            <button className="btn btn-outline-success mx-1" onClick={() => setFilter("completed")}>
              Completed
            </button>
            <button className="btn btn-outline-warning mx-1" onClick={() => setFilter("incomplete")}>
              In-Completed
            </button>
          </div>

          {/* Task Columns */}
          <Tasks
            tasks={filteredTasks}
            statusLabel="todo"
            displayName="Tasks"
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            changeStatus={changeStatus}
          />
          <Tasks
            tasks={filteredTasks}
            statusLabel="doing"
            displayName="Doing"
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            changeStatus={changeStatus}
          />
          <Tasks
            tasks={filteredTasks}
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
