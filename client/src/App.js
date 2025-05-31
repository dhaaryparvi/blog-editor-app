import { Routes, Route, Link } from 'react-router-dom';
import BlogEditor from './components/BlogEditor';
import BlogList from './components/BlogList';
import Login from './components/Login';
import Register from './components/Register';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const { token, username, logout } = useContext(AuthContext);

  return (
    <>
      <nav style={{ padding: '10px' }}>
        <Link to="/">Write</Link> | 
        <Link to="/blogs">View</Link> | 
        {!token ? (
          <>
            <Link to="/login">Login</Link> | 
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span> Hello, {username} </span>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<BlogEditor />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
