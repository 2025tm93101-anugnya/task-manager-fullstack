import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const [username, setUsername] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const API = "http://localhost:5000/tasks";

  // LOGIN
  const login = () => {
    if (!username) return;
    localStorage.setItem("user", username);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser("");
  };

  // FETCH TASKS
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  // ADD TASK
  const addTask = async () => {
    if (!title) return;
    await axios.post(API, { title });
    setTitle("");
    fetchTasks();
    toast.success("Task added ✅");
  };

  // TOGGLE TASK
  const toggleTask = async (task) => {
    await axios.put(`${API}/${task._id}`, {
      completed: !task.completed,
    });
    fetchTasks();
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
    toast.error("Task deleted ❌");
  };

  // HANDLE CHECKBOX CLICK
  const handleToggle = (task) => {
    if (task.completed) {
      toggleTask(task);
      return;
    }

    setSelectedTask(task);
    setShowConfirm(true);
  };

  // CONFIRM COMPLETE
  const confirmComplete = async () => {
    await toggleTask(selectedTask);
    toast.success("Task marked as completed ✅");
    setShowConfirm(false);
  };

  // CANCEL COMPLETE
  const cancelComplete = () => {
    setShowConfirm(false);
  };

  // FILTER + SORT
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .sort((a, b) => a.completed - b.completed);

  // LOGIN SCREEN
  if (!user) {
    return (
      <div className="container">
        <h1>Login</h1>
        <input
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  // MAIN UI
  return (
    <div className="container">

      {/* Header */}
      <div className="header">
        <h1>Task Manager</h1>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Input */}
      <div className="input-section">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* Filters */}
      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>

        <button
          className={filter === "pending" ? "active" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      {/* Count */}
      <p className="count">
        Total: {tasks.length} | Completed:{" "}
        {tasks.filter((t) => t.completed).length}
      </p>

      {/* Task List */}
      <ul>
        {filteredTasks.length === 0 ? (
          <p className="empty">No tasks found</p>
        ) : (
          filteredTasks.map((task) => (
            <li key={task._id}>
              <div className="task-left">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task)}
                />

                <span className={task.completed ? "completed" : ""}>
                  {task.title}
                </span>
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>

      {/* MODAL */}
      {showConfirm && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to complete this task?</p>
            <div className="modal-buttons">
              <button onClick={confirmComplete}>Yes</button>
              <button onClick={cancelComplete}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      <ToastContainer />
    </div>
  );
}

export default App;