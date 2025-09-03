const Student = require('../models/students.js');

const viewProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id }).populate("user", "username email role");
    if (!student) {
      return res.status(404).json({ msg: "Student profile not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const viewAttendance = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }
    res.status(200).json(student.attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const viewGrades = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }
    res.status(200).json(student.grades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { viewProfile, viewAttendance, viewGrades };