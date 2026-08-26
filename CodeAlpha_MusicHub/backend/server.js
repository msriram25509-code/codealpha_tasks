const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Routes
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");   // NEW

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.json({
    project: "MusicHub",
    status: "Backend Running",
    developer: "Sriram"
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);   // NEW

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`MusicHub Server Running: http://localhost:${PORT}`);
});