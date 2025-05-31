const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
// Save or update a draft
router.post('/save-draft',auth ,  async (req, res) => {
     console.log(' User making request:', req.user);        // Will show the decoded user from JWT
  console.log(' Request body:', req.body);  
    const { id, title, content, tags } = req.body;
    try {
        const blog = id
            ? await Blog.findByIdAndUpdate( { _id: id, userId: req.user.id }, { title, content, tags, status: 'draft' }, { new: true })
            : await Blog.create({ userId: req.user.id, title, content, tags, status: 'draft' });
        res.json(blog);
    } catch (err) {
         console.error('❌ Save Draft Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Publish blog
router.post('/publish',auth, async (req, res) => {
    const { id, title, content, tags } = req.body;
    try {
        const blog = id
            ? await Blog.findByIdAndUpdate( { _id: id, userId: req.user.id }, { title, content, tags, status: 'published' }, { new: true })
            : await Blog.create({  userId: req.user.id, title, content, tags, status: 'published' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({ userId: req.user.id }).sort({ updatedAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get blog by ID
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
