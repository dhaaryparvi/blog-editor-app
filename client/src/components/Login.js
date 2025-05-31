import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      login(res.data.token, username);
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br /><br />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br /><br />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
