const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log('Registering user:', username);

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash });
    console.log('User created in DB:', user);
    res.json({ message: 'User registered' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(400).json({ error: 'User already exists' });
  }
});



// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password); // ✅ compare hash
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


module.exports = router;
