const express = require('express');
const router = express.Router();
const { createJob, getJobs, getMyJobs } = require('../controllers/jobController');
const protect = require('../middlewares/authMiddleware');
const allowRoles = require('../middlewares/roleMiddleware');

// Create a job (only recruiter or manager)
router.post('/', protect, allowRoles('recruiter', 'manager'), createJob);

// View all jobs (public)
router.get('/', getJobs);

// View my posted jobs (protected)
router.get('/myjobs', protect, allowRoles('recruiter', 'manager'), getMyJobs);

module.exports = router;
