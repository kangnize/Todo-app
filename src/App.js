import React, { useState, useEffect } from "react";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import "./App.css";
import { getTaskCountByStatus } from "./utils";
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'completed', 'incomplete'
  const totalTasks = getTaskCountByStatus(tasks, "all");
  const totalTodo = getTaskCountByStatus(tasks, "todo");
  const totalDoing = getTaskCountByStatus(tasks, "doing");
  const totalDone = getTaskCountByStatus(tasks, "done");

  const toggleFavourite = (index) => {
    const updated = [...tasks];
    updated[index].favourite = !updated[index].favourite;
    setTasks(updated);
  };

  const handleClearCompleted = () => {
    const updated = tasks.filter((task) => task.status !== "done");
    setTasks(updated);
  };

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
      setTasks([...tasks, { text: input, status: "todo", favourite: false }]);
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

          <div className="d-flex justify-content-center mb-4">
            <div
              className="card text-center"
              style={{ maxWidth: "500px", width: "100%" }}
            >
              <div className="card-body p-3">
                <h5 className="card-title mb-3">Task Summary</h5>
                <div className="d-flex justify-content-around">
                  <span className="badge bg-primary px-3 py-2">
                    Total <br /> <strong>{totalTasks}</strong>
                  </span>
                  <span className="badge bg-info text-dark px-3 py-2">
                    To Do <br /> <strong>{totalTodo}</strong>
                  </span>
                  <span className="badge bg-warning text-dark px-3 py-2">
                    Doing <br /> <strong>{totalDoing}</strong>
                  </span>
                  <span className="badge bg-success px-3 py-2">
                    Done <br /> <strong>{totalDone}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Filter Buttons */}
          <div className="mb-3 text-center">
            <button
              className="btn btn-outline-primary mx-1"
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className="btn btn-outline-success mx-1"
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
            <button
              className="btn btn-outline-warning mx-1"
              onClick={() => setFilter("incomplete")}
            >
              In-Completed
            </button>
          </div>

          <div className="text-center mb-4">
            <button
              className="btn btn-danger"
              onClick={handleClearCompleted}
              disabled={totalDone === 0}
            >
              Clear Completed Tasks
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
            toggleFavourite={toggleFavourite}

          />
          <Tasks
            tasks={filteredTasks}
            statusLabel="doing"
            displayName="Doing"
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            changeStatus={changeStatus}
            toggleFavourite={toggleFavourite}

          />
          <Tasks
            tasks={filteredTasks}
            statusLabel="done"
            displayName="Done"
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            changeStatus={changeStatus}
            toggleFavourite={toggleFavourite}

          />
        </div>
      </div>
    </div>
  );
}

export default App;
