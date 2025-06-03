const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../client")));

// API Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);

// Fallback route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
