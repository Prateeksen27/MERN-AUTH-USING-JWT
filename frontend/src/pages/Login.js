import React, { useState } from 'react'
import axios from 'axios';
import { useAuthStore } from "../store/useAuthStore";
const Login = () => {

    // const [username,setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
    //         localStorage.setItem('token', response.data);
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error('Error logging in:', error);
    //     }
    // };
    // const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const { login, isLoggingIn } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div>
            h2
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <label for="name">Enter your username : </label>
                <input type="text" id="name" value={formData.username} onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  } />
                <br />
                <label for="password">Enter your password : </label>
                <input type="password" id="password" value={formData.password} onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  } />
                <br />
                <button type="submit" >Login</button>
                <button type="reset">Reset</button>
            </form>
        </div>
    )
}

export default Login