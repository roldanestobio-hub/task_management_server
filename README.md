# Task Management Application

A Fullstack Task Management Application built with React and Express/Node.js

## Tech Stack

### Frontend
- React + Vite
- Bootstrap
- Axios
- Notyf

### Backend
- Express/Node.js
- Sequelize ORM
- MySQL
- JWT Authentication
- Bcryptjs

## Setup Instructions

### Prerequisites
- Node.js installed
- MySQL installed and running

### Backend Setup
1. Clone the repository
2. Navigate to backend folder:
```
cd task_management_server
```
3. Install dependencies:
```
npm install
```
4. Create a MySQL database:
```sql
CREATE DATABASE task_management;
```
5. Create `.env` file with:
```
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=task_management
JWT_SECRET_KEY=your_secret_key
```
6. Run the server:
```
npm run dev
```
7. Sequelize will automatically create the tables!

### Frontend Setup
1. Navigate to frontend folder:
```
cd task_management_application
```
2. Install dependencies:
```
npm install
```
3. Create `.env` file with:
```
VITE_TASK_MANAGEMENT_API=http://localhost:4000
```
4. Run the app:
```
npm run dev
```
5. Open browser at `http://localhost:5173`

## Dependencies

### Backend
- express
- sequelize
- mysql2
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- nodemon (dev dependency)

### Frontend
- react
- react-router-dom
- axios
- bootstrap
- notyf

## Features
- User Authentication (Register/Login)
- Create, Read, Update, Delete Tasks
- Mark tasks as Complete/Incomplete
- Set tasks as Active/Inactive
- Search tasks by name
- Filter by All, Active, Inactive, Completed
- Search and Filter work together
- View all tasks or only your own tasks