# Task Management Application

## Setup Instructions

### Backend
1. Clone the repository
2. Navigate to backend folder: `cd task_management_server`
3. Install dependencies: `npm install`
4. Create `.env` file with:
```
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=task_management
JWT_SECRET_KEY=your_secret_key
```
5. Run the server: `npm run dev`

### Frontend
1. Navigate to frontend folder: `cd task_management_application`
2. Install dependencies: `npm install`
3. Create `.env` file with:
```
VITE_TASK_MANAGEMENT_API=http://localhost:4000
```
4. Run the app: `npm run dev`

## Dependencies

### Backend
- express
- sequelize
- mysql2
- bcryptjs
- jsonwebtoken
- cors
- dotenv

### Frontend
- react
- react-router-dom
- axios
- bootstrap
- notyf