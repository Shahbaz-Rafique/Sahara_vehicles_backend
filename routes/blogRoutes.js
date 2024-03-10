const express = require('express');
const router = express.Router();
const Blog = require('../models/blogModel');

// Blog registration route
router.post('/add', async (req, res) => {
    try {
        const blog = new Blog({
            img: req.body.img,
            title: req.body.title,
            details: req.body.details,
            writer: req.body.writer,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt,
        });

        await blog.save();

        res.status(201).json({
            success: true,
            message: "Blog registered successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// List blogs route
router.get('/list', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({
            success: true,
            blogs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Update blog route
router.put('/update/:blogId', async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        res.status(200).json({
            success: true,
            blog: updatedBlog,
            message: "Blog updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Delete blog route
router.delete('/delete/:blogId', async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        if (!deletedBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
