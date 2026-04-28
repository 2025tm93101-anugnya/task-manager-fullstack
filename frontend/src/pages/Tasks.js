import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const API = "http://localhost:5000/tasks";

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!title) return;

    await axios.post(API, {
      title,
      priority,
      dueDate,
    });

    setTitle("");
    setPriority("Medium");
    setDueDate("");

    fetchTasks();
  };

  // Toggle complete
  const toggleTask = async (task) => {
    await axios.put(`${API}/${task._id}`, {
      completed: !task.completed,
    });

    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  // Edit task
  const editTask = async (task) => {
    const newTitle = prompt("Edit task:", task.title);
    if (!newTitle) return;

    await axios.put(`${API}/${task._id}`, {
      title: newTitle,
    });

    fetchTasks();
  };

  // Filtering + search + sorting
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.completed - b.completed); // completed at bottom

  return (
    <div className="main">
      <div className="card">
        <h2>📝 Tasks</h2>

        {/* Add Task Section */}
        <div className="input-section">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task..."
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button onClick={addTask}>Add</button>
        </div>

        {/* Search */}
        <input
          className="search"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

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

        {/* Stats */}
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
              <li key={task._id} className="task-item">
                
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {
                    if (!task.completed) {
                      if (
                        window.confirm(
                          "Are you sure you want to mark this task as completed?"
                        )
                      ) {
                        toggleTask(task);
                      }
                    } else {
                      toggleTask(task);
                    }
                  }}
                />

                {/* Title */}
                <span
                  className={task.completed ? "completed" : ""}
                >
                  {task.title}
                </span>

                {/* Priority */}
                <span className={`priority ${task.priority?.toLowerCase()}`}>
                  {task.priority}
                </span>

                {/* Date */}
                <span className="date">
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : ""}
                </span>

                {/* Buttons */}
                <button onClick={() => editTask(task)}>Edit</button>

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
      </div>
    </div>
  );
}

export default Tasks;