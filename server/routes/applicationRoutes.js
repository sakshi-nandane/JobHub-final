const express = require("express");

const router = express.Router();

const {
  applyJob,
  getMyApplications,
  updateStatus,
} = require(
  "../controllers/applicationController"
);

const {
  protect,
} = require("../middleware/authMiddleware");

const upload =
  require("../middleware/uploadMiddleware");

router.post(
  "/",
  protect,
  upload.single("resume"),
  applyJob
);

router.get(
  "/my",
  protect,
  getMyApplications
);

router.put(
  "/:id/status",
  updateStatus
);

module.exports = router;