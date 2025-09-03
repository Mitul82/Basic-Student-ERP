const Student = require('../models/students.js');
const Teacher = require('../models/teachers.js');

const markAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { date, status } = req.body;

    if (!date || !status) {
      return res.status(400).json({ msg: "Date and status are required" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    student.attendance.push({ date, status });
    await student.save();

    res.status(200).json({ msg: "Attendance marked successfully", attendance: student.attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const updateGrades = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { subject, score, grade } = req.body;

    if (!subject || score === undefined) {
      return res.status(400).json({ msg: "Subject and score are required" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    student.grades.push({ subject, score, grade });
    await student.save();

    res.status(200).json({ msg: "Grades updated successfully", grades: student.grades });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const viewAllStudents = async (req, res) => {
  try {
    const { className } = req.query;
    let students;

    if (className && className.trim() !== "") {
      students = await Student.find({ className }).populate("user", "username role email");
    } else {
      students = await Student.find().populate("user", "username role email");
    }

    res.status(200).json({ students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const teacherInfo = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ user: req.user.id }).populate("user", "username email role");
    if (!teacher) return res.status(404).json({ msg: "Teacher not found" });

    res.status(200).json({ 
      teacher: {
        name: teacher.name,
        email: teacher.user.email,
        assignedClasses: teacher.assignedClasses || [],
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
}

module.exports = { markAttendance, updateGrades, viewAllStudents, teacherInfo };