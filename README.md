# Task Manager Full Stack Application

## 📌 Problem Statement
A web app to manage daily tasks with add, update, delete, and filter features.

---

## 🏗️ Architecture
React (Frontend) → Node.js + Express (Backend) → MongoDB (Database)

---

## ⚙️ Technologies
- React
- Node.js
- Express
- MongoDB
- Axios
- React Toastify

---

## 🔌 API Endpoints
- POST /tasks → Create task
- GET /tasks → Get all tasks
- PUT /tasks/:id → Update task
- DELETE /tasks/:id → Delete task

---

## 💡 Features
- Login (localStorage)
- Add / delete tasks
- Mark complete with confirmation popup
- Filters (All / Completed / Pending)
- Toast notifications
- Completed tasks move to bottom

---

## ▶️ How to Run

### Backend
cd backend  
npm install  
npx nodemon server.js  

### Frontend
cd frontend  
npm install  
npm start  

---

## 🎯 Future Improvements
- Authentication (JWT)
- User-specific tasks
- Task deadlines
