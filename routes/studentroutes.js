const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/auth');
const authorizeRoles = require('../middleware/authroles.js');

const { viewProfile, viewAttendance, viewGrades } = require('../controllers/students.js');


router.get('/student/profile', authMiddleware, authorizeRoles("student"), viewProfile);
router.get('/student/attendance', authMiddleware, authorizeRoles("student"), viewAttendance);
router.get('/student/grades', authMiddleware, authorizeRoles("student"), viewGrades);

module.exports = router;