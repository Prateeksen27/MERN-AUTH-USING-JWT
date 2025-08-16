import React from 'react'
import { useState } from 'react';
import axios from 'axios';
const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { username, password });
            console.log('Registration successful:', response.data);
        } catch (error) {
            console.error('Error registering:', error);
        }
    }
    return (
        <div>
            <h2>Register Page</h2>
            <form>
                <label htmlFor="name">Enter your username: </label>
                <input type="text" id="name" value={username} onChange={(e) => setUsername(e.target.value)} />
                <br />
                <label htmlFor="password">Enter your password: </label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button type="submit" onClick={handleSubmit}>Register</button>
                <button type="reset">Reset</button>
            </form>
            <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
    )
}

export default Register