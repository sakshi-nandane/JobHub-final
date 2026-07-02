const express = require("express");

const router = express.Router();

const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  saveJob,
  getSavedJobs,
} = require("../controllers/jobController");

const {
  protect,
} = require("../middleware/authMiddleware");

// Get All Jobs
router.get("/", getJobs);

// Saved Jobs
router.get(
  "/saved/me",
  protect,
  getSavedJobs
);

// Single Job
router.get("/:id", getJobById);

// Create Job
router.post("/", createJob);

// Update Job
router.put("/:id", updateJob);

// Save Job
router.put(
  "/:id/save",
  protect,
  saveJob
);

// Delete Job
router.delete("/:id", deleteJob);

module.exports = router;