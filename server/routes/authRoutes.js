const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const Admin = require("../models/userModel");
const Teacher = require("../models/teacherModel");

// ✅ Unified Signup Route
router.post("/signup", async (req, res) => {
  const { signUpType } = req.body;

  try {
    if (signUpType === "admin") {
      const { email, password } = req.body;
      const existing = await Admin.findOne({ email });
      if (existing)
        return res.status(409).json({ message: "Admin already exists" });

      const admin = await Admin.create({ email, password });
      return res.status(201).json({ message: "Admin created", user: admin });
    } else if (signUpType === "teacher") {
      const { teacherID, teacherName } = req.body;
      const existing = await Teacher.findOne({ teacherID });
      if (existing)
        return res.status(409).json({ message: "Teacher already exists" });

      const teacher = await Teacher.create({ teacherID, teacherName });
      return res
        .status(201)
        .json({ message: "Teacher created", user: teacher });
    } else {
      return res.status(400).json({ message: "Invalid sign-up type" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Unified Signin Route
router.post("/signin", async (req, res) => {
  const { signInType } = req.body;

  try {
    if (signInType === "admin") {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(401).json({ message: "Admin not found" });
      }

      if (admin.password !== password) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      return res
        .status(200)
        .json({ message: "Admin sign in successful", user: admin });
    } else if (signInType === "teacher") {
      const { teacherID } = req.body;
      const teacher = await Teacher.findOne({ teacherID });

      if (!teacher) {
        return res.status(401).json({ message: "Invalid teacher ID" });
      }

      return res.status(200).json({
        message: "Teacher sign in successful",
        user: teacher,
      });
    } else {
      return res.status(400).json({ message: "Invalid sign-in type" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Testing Route (optional)
router.get("/test-admin", async (req, res) => {
  try {
    const email = "admin@123";
    const password = "admin";
    const admin = await Admin.findOne({ email, password });

    if (!admin) {
      return res
        .status(404)
        .json({ message: "Admin not found or wrong password" });
    }

    res.status(200).json({ message: "Admin found", user: admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Fetch teacher by ID
router.get("/fetchteachers/:teacherID", async (req, res) => {
  try {
    const { teacherID } = req.params;
    const teacher = await Teacher.findOne({ teacherID });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ teacher });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
