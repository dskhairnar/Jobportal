const Job = require('../models/Job');

// Create new job
exports.createJob = async (req, res) => {
  const { title, description, location, salary } = req.body;

  try {
    const job = new Job({
      title,
      description,
      location,
      salary,
      postedBy: req.user._id
    });

    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('postedBy', 'name email');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get jobs posted by logged-in user
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
