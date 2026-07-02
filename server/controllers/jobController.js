const Job = require("../models/Job");
const axios = require("axios");

const RAPID_API_KEY = process.env.RAPIDAPI_KEY;
const RAPID_API_HOST = process.env.RAPIDAPI_HOST;

// ================= GET ALL JOBS =================

exports.getJobs = async (req, res) => {
  try {
    const { title = "", location = "" } = req.query;

    // MongoDB Jobs
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

    const mongoJobs = await Job.find(filter);

    // RapidAPI Jobs
    let apiJobs = [];

    try {
      const response = await axios.get(
  "https://jsearch.p.rapidapi.com/search-v2",
  {
    params: {
  query: title || "Software Developer",
  page: "1",
  num_pages: "1",
  country: "in",
  date_posted: "all",
},
    headers: {
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": RAPID_API_HOST,
    },
  }
);

console.log("========== RAPID RESPONSE ==========");
console.log(JSON.stringify(response.data, null, 2));

const jobs =
  response.data?.data?.jobs ||
  response.data?.jobs ||
  response.data?.results ||
  [];


  console.log("Is Array:", Array.isArray(jobs));
console.log("Jobs Count:", jobs.length);

apiJobs = jobs.map((job) => ({
  _id: job.job_id || Math.random().toString(),
  title: job.job_title || job.title,
  company: job.employer_name || job.company,
  location:
    job.job_city ||
    job.location ||
    job.job_country ||
    "India",
  description:
    job.job_description ||
    job.description ||
    "No Description",
  isRapid: true,
  applyLink:
    job.job_apply_link ||
    job.apply_link,
}));
      }
    catch (err) {
      console.log("========== RAPID API ERROR ==========");
      console.log(err.response?.status);
      console.log(err.response?.data);
      console.log(err.message);
    }

    res.status(200).json([
      ...mongoJobs,
      ...apiJobs,
    ]);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= GET JOB BY ID =================

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

// ================= CREATE JOB =================

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

// ================= UPDATE JOB =================

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(job);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= DELETE JOB =================

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

// ================= SAVE JOB =================

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

// ================= SAVED JOBS =================

exports.getSavedJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      savedBy: req.user.id,
    });

    res.json(jobs);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};