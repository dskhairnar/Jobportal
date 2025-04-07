const express = require('express');
const router = express.Router();

const{ registerUser, loginUser} = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware');
const allowRoles = require('../middlewares/roleMiddleware');


router.post('/register', registerUser);
router.post('/login', loginUser);



// Protected route for Job Seekers
router.get('/jobseeker/dashboard', protect, allowRoles('jobseeker'), (req, res) => {
    res.json({ msg: `Welcome Job Seeker ${req.user.name}` });
  });
  
  // Protected route for Managers
  router.get('/manager/dashboard', protect, allowRoles('manager'), (req, res) => {
    res.json({ msg: `Welcome Hiring Manager ${req.user.name}` });
  });
  
  // Protected route for Recruiters
  router.get('/recruiter/dashboard', protect, allowRoles('recruiter'), (req, res) => {
    res.json({ msg: `Welcome Recruiter ${req.user.name}` });
  });



module.exports = router;