const Application = require('../models/application');
const Job = require('../models/Job');

// Apply to a job
exports.applyToJob = async (req, res) => {
  const { jobId } = req.body;

  try {
    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ msg: 'Job not found' });

    // Create application
    const application = new Application({
      job: jobId,
      applicant: req.user._id
    });

    await application.save();
    res.status(201).json({ msg: 'Application submitted successfully' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'You have already applied to this job' });
    }
    res.status(500).json({ msg: err.message });
  }
};

// View all jobs applied by current user
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate('job');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
