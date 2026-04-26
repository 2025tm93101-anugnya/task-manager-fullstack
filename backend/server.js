const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/Task');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/taskdb")
.then(() => console.log("DB connected ✅"))
.catch(err => console.log("DB error ❌", err));

// Default route
app.get('/', (req, res) => {
  res.send("Server is running 🚀");
});

// CREATE TASK
app.post('/tasks', async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: "Title is required" });
    }
    const task = new Task(req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL TASKS
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE TASK
app.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE TASK
app.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});