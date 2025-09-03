const bcrypt = require("bcryptjs");
const User = require("../models/users");
const Student = require("../models/students");
const Teacher = require("../models/teachers");

const addStudent = async (req, res) => {
  try {
    const { name, fatherName, className, rollNo } = req.body;

    if (!name || !fatherName || !className || !rollNo) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const user = await User.create({
      username: rollNo,
      password: "password",
      role: "student",
    });

    console.log('Creating student...');
    const student = await Student.create({
      user: user._id,
      name,
      fatherName,
      className,
      rollNo,
    });
    console.log('Student created:', student);

    res.status(201).json({ msg: "Student added successfully", student });
  } catch (error) {
    console.error('Error in addStudent:', error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const removeStudent = async (req, res) => {
  try {
    const studentId  = req.params.studentId;

    if (!studentId) {
      return res.status(400).json({ msg: "Student ID is required" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    await User.findByIdAndDelete(student.user);
    await student.deleteOne();

    res.status(200).json({ msg: "Student removed successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { name, fatherName, className, rollNo } = req.body;

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ msg: "Student not found" });

    if (name) student.name = name;
    if (fatherName) student.fatherName = fatherName;
    if (className) student.className = className;
    if (rollNo) {
      student.rollNo = rollNo;

      const user = await User.findById(student.user);
      if (user) {
        user.username = rollNo;
        await user.save();
      }
    }

    await student.save();

    res.status(200).json({ msg: "Student updated successfully", student });
  } catch (error) {
    console.error("Error in updateStudent:", error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("user", "username role");
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const createTeacher = async (req, res) => {
  try {
    const { name, subject, email, employeeId, assignedClasses } = req.body;

    if (!name || !subject || !email || !employeeId || !assignedClasses) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const user = await User.create({
      username: employeeId,
      password: "password",
      role: "teacher",
    });
    
    const teacher = await Teacher.create({
      user: user._id,
      name,
      subject,
      email,
      employeeId,
      assignedClasses,
    });

    res.status(201).json({ message: "Teacher created successfully!", teacher });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const updates = req.body;

    const teacher = await Teacher.findByIdAndUpdate(
      teacherId,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    res.status(200).json({ message: "Teacher updated successfully", teacher });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const removeTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    await User.findByIdAndDelete(teacher.user);
    await teacher.deleteOne();

    res.status(200).json({ message: "Teacher removed successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate("user", "username role");
    res.status(200).json({ teachers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addStudent, removeStudent, updateStudent, getAllStudents,createTeacher, updateTeacher, removeTeacher, getAllTeachers };