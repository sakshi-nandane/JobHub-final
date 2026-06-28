const Job = require("../models/Job");

exports.getJobs = async (req, res) => {
  try {
    const { title, location } = req.query;

    let filter = {};

    if (title) {
      filter.title = {
        $regex: title,
        $options: "i",
      };
    }

    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    const jobs = await Job.find(filter);

    res.json(jobs);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json(job);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);

    res.status(201).json(job);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.json({
      message: "Job deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.saveJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    if (!job.savedBy.includes(req.user.id)) {
      job.savedBy.push(req.user.id);
      await job.save();
    }

    res.json({
      message: "Job Saved Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getSavedJobs = async (
  req,
  res
) => {
  try {
    const jobs =
      await Job.find({
        savedBy: req.user.id,
      });

    res.json(jobs);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};