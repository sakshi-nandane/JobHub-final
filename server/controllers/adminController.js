const Job = require("../models/Job");
const User = require("../models/User");
const Application = require("../models/Application");

exports.getStats = async (req, res) => {
  try {
    const jobs = await Job.countDocuments();

    const users = await User.countDocuments();

    const applications =
      await Application.countDocuments();

    const recentApplications =
      await Application.find()
        .populate("job")
        .sort({ createdAt: -1 })
        .limit(5);

    res.json({
      jobs,
      users,
      applications,
      recentApplications,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllApplications =
  async (req, res) => {
    try {
      const applications =
        await Application.find()
          .populate("job")
          .sort({
            createdAt: -1,
          });

      res.json(applications);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };