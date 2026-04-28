import { useEffect, useState } from "react";
import axios from "axios";

function Stats() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/tasks")
      .then(res => setTasks(res.data));
  }, []);

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  return (
    <div className="card">
      <h2>📊 Task Statistics</h2>

      <p>Total Tasks: {total}</p>
      <p>Completed: {completed}</p>
      <p>Pending: {pending}</p>

      <p>
        Completion Rate: {total ? ((completed / total) * 100).toFixed(1) : 0}%
      </p>
    </div>
  );
}

export default Stats;