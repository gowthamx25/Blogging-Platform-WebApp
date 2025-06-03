const express = require("express");
const Blog = require("../models/Blog");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   POST /api/blogs
// @desc    Create a new blog post (Protected)
// @access  Private
router.post("/", protect, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const blog = new Blog({
      title,
      content,
      author: req.user._id, // assumes protect middleware sets req.user
    });

    const savedBlog = await blog.save();
    res.status(201).json({ message: "Blog posted!", blog: savedBlog });
  } catch (err) {
    console.error("Error posting blog:", err); // helpful for debugging
    res.status(500).json({ message: "Failed to post blog" });
  }
});

// @route   GET /api/blogs
// @desc    Get all blog posts
// @access  Public
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");
    res.json(blogs);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});

module.exports = router;
