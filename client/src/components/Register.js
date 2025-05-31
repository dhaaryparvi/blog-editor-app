import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, password });
      alert('Registered! Now login.');
      navigate('/login');
    } catch (err) {
      alert('Username already taken.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h2>Register</h2>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br /><br />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br /><br />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
