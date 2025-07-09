// const User = require('../models/userModel');

// exports.signIn = async (req, res) => {
//   try {
//     console.log(req.body)
//     const { email, password } = req.body;
//     const user = await User.findOne({ email, password });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }
//     res.status(200).json({ message: 'Sign in successful', user });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const Admin = require("../models/userModel");
const Teacher = require("../models/teacherModel");
// Admin Signup
exports.adminSignUp = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // You can hash password here if needed
    const newAdmin = new Admin({ email, password, username });
    await newAdmin.save();

    res
      .status(201)
      .json({ message: "Admin signup successful", user: newAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Teacher Signup
exports.teacherSignUp = async (req, res) => {
  try {
    const { teacherID, teacherName } = req.body;

    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ teacherID });
    if (existingTeacher) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    const newTeacher = new Teacher({ teacherID, teacherName });
    await newTeacher.save();

    res
      .status(201)
      .json({ message: "Teacher signup successful", user: newTeacher });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.adminSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received credentials:", email, password);

    const admin = await Admin.findOne({ email, password });
    console.log("Matched admin from DB:", admin);

    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Admin sign in successful", user: admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.teacherSignIn = async (req, res) => {
  try {
    const { teacherID } = req.body;
    const teacher = await Teacher.findOne({ teacherID });
    if (!teacher) {
      return res.status(401).json({ message: "Invalid teacher ID" });
    }
    res
      .status(200)
      .json({ message: "Teacher sign in successful", user: teacher });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
