# Kite Backend

Backend API for the **Kite Dashboard** project built using **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**. It provides secure user authentication and REST APIs for the frontend dashboard.

## Features

- User Registration
- User Login
- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes using Middleware
- MongoDB Database Integration
- RESTful API Architecture
- Error Handling
- CORS Enabled
- Environment Variable Support

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT (JSON Web Token)
- bcrypt.js
- dotenv
- CORS

## Project Structure

```
kite-backend/
│
├── middleware/
│   └── auth.js
│
├── model/
│
├── schema/
│   └── User.js
│
├── index.js
├── package.json
├── .env
└── package-lock.json
```

## Installation

Clone the repository

```bash
git clone https://github.com/Dibyanshukk/kite-backend.git
```

Move into the project

```bash
cd kite-backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the server

```bash
node index.js
```

or

```bash
npm start
```

## API Endpoints

### Register User

```http
POST /register
```

### Login User

```http
POST /login
```

### Protected Route

```http
GET /verify
```

(Requires JWT Token)

## Frontend Integration

The backend is connected with the Kite Dashboard frontend.

Frontend Repository

https://github.com/Dibyanshukk/kite-dashboard

Frontend Deployment

https://main.d2rxo13lgkvn27.amplifyapp.com

## Backend Deployment

Render

https://kite-backend-kpgc.onrender.com

## Future Improvements

- Refresh Token Authentication
- Forgot Password & Reset Password
- Email Verification using OTP
- User Profile APIs
- Change Password API
- Rate Limiting
- Input Validation using Joi/Zod
- Role-Based Authentication (Admin/User)
- API Documentation using Swagger
- Centralized Error Handling
- Logging with Winston/Morgan
- Docker Support
- Unit & Integration Testing
- CI/CD Pipeline with GitHub Actions
- Redis Caching
- Session Management
- Account Lock after Multiple Failed Login Attempts
- API Versioning
- Database Backup Strategy
- Production Security Enhancements (Helmet, CSRF, etc.)

## Author

**Dibyanshukk**

GitHub:
https://github.com/Dibyanshukk

---

This project serves as the backend for the Kite Dashboard application and demonstrates secure authentication, REST APIs, JWT authorization, and MongoDB integration using the MERN stack.
