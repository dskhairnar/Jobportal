const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const allowRoles = require('../middlewares/roleMiddleware');
const { applyToJob, getMyApplications } = require('../controllers/applicationController');

// Job seeker applies to a job
router.post('/apply', protect, allowRoles('jobseeker'), applyToJob);

// Job seeker sees their applied jobs
router.get('/my-applications', protect, allowRoles('jobseeker'), getMyApplications);

module.exports = router;
