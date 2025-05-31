const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    content: String,
    tags: [String],
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
