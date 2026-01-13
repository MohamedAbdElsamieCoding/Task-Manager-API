# Task Manager API 🚀

A robust, enterprise-ready Task Management API built with Node.js, TypeScript, and MongoDB. This project provides a full-featured backend for managing tasks, complete with user authentication, automated reminders, and professional documentation.

## 🌟 Key Features

- **Authentication & Security**:
  - Secure Signup/Login with JWT (Access & Refresh Tokens).
  - Password hashing with Bcrypt.
  - Rate Limiting to prevent brute-force attacks.
  - Protected routes for task management.
- **Task Management**:
  - Full CRUD: Create, Read, Update, Delete tasks and Delete All.
  - **Priority System**: Categorize tasks by Low, Medium, or High priority.
  - **Deadlines**: Set `dueTo` dates for every task.
  - **Filtering & Search**: Powerful search and filtering by status, priority, and content.
  - **Pagination**: Efficient retrieval of large task lists.
- **Automated Reminders**:
  - Background job processing using **Agenda**.
  - Push notifications via **Firebase Admin SDK**.
- **Documentation**:
  - Interactive API documentation using **Swagger UI**.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js (ES Modules)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Background Jobs**: Agenda
- **Notifications**: Firebase Admin
- **Validation**: Zod
- **Documentation**: Swagger (OpenAPI 3.0)
- **Security**: Helmet, CORS, Express-Rate-Limit, BCrypt, JWT
- **Testing**: Jest with MongoDB Memory Server

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
    Create a `.env` file in the root:

    ```env
    PORT=5000
    MONGO_URL=your_mongodb_uri
    JWT_SECRET=your_secret
    JWT_EXPIRES_IN=1d
    REFRESH_SECRET=your_refresh_secret
    ```

4.  **Run Application**:
    ```bash
    npm run dev  # Development (tsx watch)
    ```

## 🔌 API Documentation

Once the server is running, visit:

- **Swagger UI**: `http://localhost:5000/api-docs`
- **JSON Spec**: `http://localhost:5000/api-docs.json`

### Core Endpoints

| Method     | Endpoint                 | Description                       |
| :--------- | :----------------------- | :-------------------------------- |
| **POST**   | `/api/v1/auth/register`  | Register new user                 |
| **POST**   | `/api/v1/auth/login`     | Login user                        |
| **PATCH**  | `/api/v1/auth/update-me` | Update profile                    |
| **POST**   | `/api/v1/task`           | Create a task                     |
| **GET**    | `/api/v1/task`           | Get all tasks (Filters available) |
| **PATCH**  | `/api/v1/task/:taskId`   | Update a task                     |
| **DELETE** | `/api/v1/task/:taskId`   | Delete a task                     |

## 🧪 Testing

```bash
npm test              # Run all integration tests
npm run test:watch    # Watch mode
```

---

Developed by **Mohamed Amr**
