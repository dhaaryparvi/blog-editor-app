const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const blogRoutes = require('./routes/blogRoutes');
app.use('/api/blogs', blogRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes); // ✅ this line should be present


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
}).catch(err => console.log(err));
