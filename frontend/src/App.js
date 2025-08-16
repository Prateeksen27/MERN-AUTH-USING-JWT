import './App.css';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { use, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Posts from './pages/Posts';
import Home from './pages/Home';
import Index from './pages/Index';

function App() {
  const {authUser} = useAuthStore();
  return (
     <Router>
      <Routes>
        <Route path='/' element={authUser ? <Index /> : <Home />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path='/register' element={!authUser ? <Register /> : <Navigate to="/" />} />
        <Route path='/posts' element={authUser ? <Posts /> : <Navigate to="/login" />} />
        <Route path='/home' element={<Home />} />
        <Route path='*' element={<Navigate to="/" />} />
        {/* Add more routes as needed */}
      </Routes>
     </Router>
   
  );
}

export default App;
