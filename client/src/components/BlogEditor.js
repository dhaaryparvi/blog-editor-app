import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const BlogEditor = () => {
  const location = useLocation();
  const blog = location.state?.blog;
  const { token } = useContext(AuthContext);

  const [id, setId] = useState(blog?._id || null);
  const [title, setTitle] = useState(blog?.title || '');
  const [content, setContent] = useState(blog?.content || '');
  const [tags, setTags] = useState(blog?.tags?.join(', ') || '');
  const [autoSaveMessage, setAutoSaveMessage] = useState('');

  // ✅ DEFINE THIS FIRST — before useEffect()
  const handleAutoSave = useCallback(async () => {
    if (!title && !content) return;
    try {
      const res = await axios.post('/api/blogs/save-draft', {
        id,
        title,
        content,
        tags: tags.split(',').map((t) => t.trim()),
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setId(res.data._id);
      setAutoSaveMessage('Auto-saved!');
      setTimeout(() => setAutoSaveMessage(''), 2000);
    } catch (err) {
      console.error('Auto-save failed:', err);
    }
  }, [id, title, content, tags, token]);

  // ✅ useEffect BELOW the function definition
  useEffect(() => {
    const interval = setInterval(handleAutoSave, 30000);
    return () => clearInterval(interval);
  }, [handleAutoSave]);

  useEffect(() => {
    const timeout = setTimeout(handleAutoSave, 5000);
    return () => clearTimeout(timeout);
  }, [title, content, tags, handleAutoSave]);

  const handlePublish = async () => {
    try {
      await axios.post('/api/blogs/publish', {
        id,
        title,
        content,
        tags: tags.split(',').map((t) => t.trim()),
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Blog published!');
      setTitle('');
      setContent('');
      setTags('');
      setId(null);
    } catch (err) {
      console.error(err);
      alert('Failed to publish.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{id ? 'Edit Blog' : 'Write a Blog'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '100%', padding: '10px' }}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: '100%', height: '200px', padding: '10px', marginTop: '10px' }}
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        style={{ width: '100%', padding: '10px', marginTop: '10px' }}
      />
      <br /><br />
      <button onClick={handleAutoSave}>Save Draft</button>
      <button onClick={handlePublish} style={{ marginLeft: '10px' }}>Publish</button>
      <div>{autoSaveMessage}</div>
    </div>
  );
};

export default BlogEditor;
