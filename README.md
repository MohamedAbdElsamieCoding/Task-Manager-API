# Task Manager API

A robust Task Management API built with modern web technologies. This project provides a full-featured backend for managing tasks, complete with user authentication and comprehensive CRUD operations.

## 🚀 Features

- **Authentication**: Secure user Signup and Login (JWT suggested).
- **Task Management**:
  - **Add Task**: Create new tasks with ease.
  - **Get All Tasks**: Retrieve a complete list of your tasks.
  - **Edit Task**: Update existing task details.
  - **Delete Task**: Remove specific tasks.
  - **Delete All Tasks**: Clear your entire task list with one action.

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Configuration**: [dotenv](https://github.com/motdotla/dotenv)

## 📁 Project Structure

```text
src/
├── controllers/    # Request handlers
├── models/         # Database schemas
├── routes/         # API endpoint definitions
├── middlewares/    # Custom Express middlewares (Auth, Errors)
├── services/       # Business logic (optional)
├── utils/          # Helper functions
├── types/          # TypeScript definitions
├── app.ts          # Express application setup
└── server.ts       # Server entry point
```

## ⚙️ Setup & Installation

1.  **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd Task-Manager-API
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and add:

    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4.  **Run in Development Mode**:

    ```bash
    npm run dev
    ```

5.  **Build for Production**:
    ```bash
    npm run build
    npm start
    ```

## 🔌 API Endpoints (Planned)

### Auth

- `POST /api/auth/register` - New user registration
- `POST /api/auth/login` - User login

### Tasks

- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all tasks
- `PATCH /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `DELETE /api/tasks` - Delete all tasks

---

Developed as a part of a professional task management solution.
