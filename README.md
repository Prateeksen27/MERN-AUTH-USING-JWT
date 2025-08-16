# MERN-AUTH-USING-JWT
This repository specifically made for the beginners who face difficulties while doing authentication using  MERN Stack.

# MERN JWT Authentication – Step by Step Guide

This repository demonstrates how to implement **authentication in the MERN stack** (MongoDB, Express.js, React, Node.js) using **JWT (JSON Web Tokens)** for secure login and protected routes.

---

## 🚀 Features
- User Registration & Login with JWT
- Password hashing with bcrypt
- Protected routes on both frontend & backend
- State management with Zustand (frontend)
- Axios interceptors for attaching tokens
- Logout and auto-expiry handling

---

## 🔑 Prerequisites
Before you begin, make sure you have the following installed:
- Node.js (>= 16.x)
- MongoDB (local or Atlas)
- Basic knowledge of **JavaScript** & **React**

---

## ⚙️ Project Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Prateeksen27/MERN-AUTH-USING-JWT.git
```

### 2️⃣ Backend Setup
Navigate to the backend folder and install dependencies.
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run the backend server:
```bash
npm start
```
The server should be running at `http://localhost:5000`.

### 3️⃣ Frontend Setup
Navigate to the frontend folder and install dependencies.
```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend`:
```
VITE_API_URL=http://localhost:5000/api
```

Run the frontend app:
```bash
npm run dev
```

The frontend should now be running at `http://localhost:5173`.

---

## 🛠️ Backend Implementation

### User Model (Mongoose)
```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model('User', userSchema);
```

### Auth Routes
```javascript
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.json({ message: 'User registered successfully' });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user: { id: user._id, username: user.username } });
});

// Protected Route
router.get('/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: 'Access granted', user: decoded });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
```

---

## 🖥️ Frontend Implementation

### Axios Instance with Interceptor
```javascript
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Zustand Store (Auth Management)
```javascript
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (username, password) => {
    const res = await axiosInstance.post('/auth/login', { username, password });
    localStorage.setItem('token', res.data.token);
    set({ user: res.data.user, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false });
  },
}));
```

### Protecting Routes in React
```javascript
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
```

---

## ✅ Testing
1. Register a new user in Postman or frontend.  
2. Login and copy the JWT token.  
3. Access `/protected` route with token in headers.  
4. Verify protected content is displayed.  

---

## 🧑‍💻 Troubleshooting
- **CORS issues** → Ensure frontend origin is allowed in backend.  
- **Token expired** → Refresh the token or re-login.  
- **MongoDB not connected** → Double-check connection string.  

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!  
Feel free to fork this repository and submit pull requests.

---

## 📜 License
This project is licensed under the MIT License.

---

## 📧 Contact
For queries or collaboration:  
**Your Name** – [suprateeksen62@gmail.com]  
GitHub: [https://github.com/Prateeksen27]
