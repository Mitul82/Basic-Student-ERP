const express = require('express');
const router = express.Router();

const { authMiddleware } = require('../middleware/auth.js');
const authorizeRoles = require('../middleware/authroles.js');

const { markAttendance, updateGrades, viewAllStudents, teacherInfo } = require('../controllers/teachers.js');
const { changePassword } = require('../controllers/users.js');

router.post('/teachers/attendance/:studentId', authMiddleware,authorizeRoles("teacher"), markAttendance);
router.put('/teachers/changepassword', authMiddleware, authorizeRoles("teacher"), changePassword);
router.put('/teachers/grades/:studentId', authMiddleware, authorizeRoles("teacher"), updateGrades);
router.get('/teachers/students', authMiddleware, authorizeRoles("teacher"), viewAllStudents);
router.get('/teachers/me', authMiddleware, authorizeRoles("teacher"), teacherInfo);

module.exports = router;