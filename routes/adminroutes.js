const express = require('express');
const router = express.Router();

const { authMiddleware}  = require('../middleware/auth.js');
const authorizeRoles = require('../middleware/authroles.js');

const { addStudent, removeStudent, getAllStudents, updateStudent, createTeacher, updateTeacher, removeTeacher, getAllTeachers } = require('../controllers/admins.js');

router.post('/admin/students',authMiddleware,authorizeRoles("admin"),addStudent);
router.delete('/admin/students/:studentId',authMiddleware,authorizeRoles("admin"),removeStudent);
router.put('/admin/students/:studentId',authMiddleware,authorizeRoles("admin"),updateStudent);
router.get('/admin/students',authMiddleware,authorizeRoles("admin"),getAllStudents);

router.post('/admin/teachers',authMiddleware,authorizeRoles("admin"),createTeacher);
router.delete('/admin/teachers/:teacherId',authMiddleware,authorizeRoles("admin"),removeTeacher);
router.put('/admin/teachers/:teacherId',authMiddleware,authorizeRoles("admin"),updateTeacher);
router.get('/admin/teachers',authMiddleware,authorizeRoles("admin"),getAllTeachers);

module.exports = router;