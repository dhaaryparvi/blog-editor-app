import React, { useEffect, useState ,} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';



const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);


  useEffect(() => {
    axios.get('http://localhost:5000/api/blogs',{
       headers: {
      Authorization: `Bearer ${token}`,
    },
    })
      .then(res => setBlogs(res.data))
      .catch(err => console.error(err));
  }, [token]);

  const editBlog = (blog) => {
    // Navigate to the editor with blog data as state
    navigate('/', { state: { blog } });
  };

  const published = blogs.filter(blog => blog.status === 'published');
  const drafts = blogs.filter(blog => blog.status === 'draft');

  return (
    <div style={{ padding: '20px' }}>
      <h2>Published Blogs</h2>
      {published.map(blog => (
        <div key={blog._id} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
          <h3>{blog.title}</h3>
          <p>{blog.content.slice(0, 100)}...</p>
          <button onClick={() => editBlog(blog)}>Edit</button>
        </div>
      ))}

      <h2>Drafts</h2>
      {drafts.map(blog => (
        <div key={blog._id} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
          <h3>{blog.title}</h3>
          <p>{blog.content.slice(0, 100)}...</p>
          <button onClick={() => editBlog(blog)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
