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

router.get("/", getJobs);

router.get("/:id", getJobById);

router.post("/", createJob);

router.delete("/:id", deleteJob);

router.put("/:id", updateJob);
router.put(
  "/:id/save",
  protect,
  saveJob
);

router.get(
  "/saved/me",
  protect,
  getSavedJobs
);


module.exports = router;