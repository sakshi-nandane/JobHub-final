const express = require("express");

const router = express.Router();

const {
  getStats,
  getAllApplications,
} = require("../controllers/adminController");

const {
  createJob,
} = require("../controllers/jobController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

router.get(
  "/stats",
  protect,
  admin,
  getStats
);

router.get(
  "/applications",
  protect,
  admin,
  getAllApplications
);

router.post(
  "/jobs",
  protect,
  admin,
  createJob
);

module.exports = router;