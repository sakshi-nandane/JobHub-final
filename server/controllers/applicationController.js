const Application = require("../models/Application");
const Job = require("../models/Job");
const sendEmail = require("../utils/sendEmail");

// ================= APPLY JOB =================

exports.applyJob = async (req, res) => {
  try {
    console.log("========== APPLY JOB ==========");

    const { jobId, name, email, phone } = req.body;

    if (!jobId || !name || !email || !phone) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload your resume (PDF)",
      });
    }

    const existing = await Application.findOne({
      user: req.user.id,
      job: jobId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Already applied for this job",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const application = await Application.create({
      user: req.user.id,
      job: jobId,
      name,
      email,
      phone,
      resume: req.file.filename,
    });

    try {
      await sendEmail(
        email,
        "Job Application Submitted Successfully",
        `
Hello ${name},

Your application for

${job.title}

at

${job.company}

has been submitted successfully.

Status : Applied

Thank you for using JobHub.

Regards,
JobHub Team
`
      );

      console.log("Application Email Sent");

    } catch (err) {
      console.log("Email Error:", err.message);
    }

    res.status(201).json({
      message: "Applied Successfully",
      application,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= MY APPLICATIONS =================

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user.id,
    }).populate("job");

    res.json(applications);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPDATE STATUS =================

exports.updateStatus = async (req, res) => {
  try {
    const application =
      await Application.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        {
          new: true,
        }
      )
        .populate("job")
        .populate("user");

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    try {
      await sendEmail(
        application.email,
        `Application Status Updated - ${application.status}`,
        `
Hello ${application.name},

Your application status has been updated.

Job : ${application.job.title}

Company : ${application.job.company}

New Status : ${application.status}

Thank you for using JobHub.

Regards,
JobHub Team
`
      );

      console.log("Status Email Sent");

    } catch (err) {
      console.log(
        "Status Email Error:",
        err.message
      );
    }

    res.json(application);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};