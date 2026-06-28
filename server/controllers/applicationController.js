const Application = require("../models/Application");
const sendEmail = require("../utils/sendEmail");
const Job = require("../models/Job");

exports.applyJob = async (req, res) => {
  try {
    console.log("========== APPLY JOB ==========");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("USER:", req.user);

    const {
      jobId,
      name,
      email,
      phone,
    } = req.body;

    const existing = await Application.findOne({
      user: req.user.id,
      job: jobId,
    });

    if (existing) {
      console.log("ALREADY APPLIED");

      return res.status(400).json({
        message: "Already applied for this job",
      });
    }

    const application = await Application.create({
      user: req.user.id,
      job: jobId,
      name,
      email,
      phone,
      resume: req.file
        ? req.file.filename
        : "",
    });

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    console.log("Job Found:", job.title);

    await sendEmail(
      email,
      "Job Application Submitted Successfully",
      `
Hello ${name},

Your application for ${job.title}
at ${job.company}
has been submitted successfully.

Status: Applied

Thank you for using JobHub.

Regards,
JobHub Team
`
    );

    console.log("Email Sent Successfully");

    res.status(201).json({
      message: "Applied Successfully",
      application,
    });

  } catch (error) {
    console.log("========== ERROR ==========");
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

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

    await sendEmail(
      application.email,
      `Application Status Updated - ${application.status}`,
      `
Hello ${application.name},

Your application status has been updated.

Job: ${application.job.title}
Company: ${application.job.company}

New Status: ${application.status}

Thank you for using JobHub.

Regards,
JobHub Team
`
    );

    console.log(
      "Status Email Sent Successfully"
    );

    res.json(application);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};