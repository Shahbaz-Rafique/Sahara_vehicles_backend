const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    writer: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
