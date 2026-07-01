const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config();

const app = express();

// Routes
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const adminRoutes =
  require("./routes/adminRoutes");

// Middleware
app.use(
  cors({
    origin: [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://job-hub-sn.vercel.app"
],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to JobHub API 🚀");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

module.exports = app;