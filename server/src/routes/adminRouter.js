const express = require("express");
const userModel = require("../models/userModel");
const adminRouter = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const studentModel = require("../models/studentModel");
const checkAuth = require("../middleware/checkAuth");

module.exports = adminRouter;

// user registration
adminRouter.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 8);
  try {
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: "admin",
    };

    const existingUsername = await userModel.findOne({ username: userData.username });
    if (existingUsername != null) {
      return res.status(409).json({
        message: "username already registered",
        success: false,
        error: true,
      });
    }
    const existingEmail = await userModel.findOne({ email: userData.email });
    if (existingEmail != null) {
      return res.status(409).json({
        message: "email already registered",
        success: false,
        error: true,
      });
    }

    const saveUser = await userModel(userData).save();
    if (saveUser) {
      return res.status(201).json({
        message: "user created",
        success: true,
        error: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// userlogin
adminRouter.post("/login", async (req, res) => {
  try {
    const loginData = {
      username: req.body.username,
      password: req.body.password,
    };

    const existingUser = await userModel.findOne({
      username: loginData.username,
    });
    if (!existingUser) {
      return res.status(404).json({
        message: "user is not registered",
        success: false,
        error: true,
      });
    }
    const existingPassword = existingUser.password;
    const passwordCheck = await bcrypt.compare(loginData.password, existingPassword);

    if (passwordCheck) {
      const token = jwt.sign(
        {
          username: existingUser.username,
          userId: existingUser._id,
          role: existingUser.role,
        },
        "encryption_key",
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        data: existingUser,
        message: "login success",
        token: token,
        success: true,
        error: false,
      });
    } else {
      res.status(409).json({
        message: "incorrect password",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error ",
    });
  }
});

// view admin profile
adminRouter.get("/profile", checkAuth, async (req, res) => {
  const user_Id = req.userData.userId;
  try {
    const profileData = await userModel.findById(user_Id);
    if (profileData) {
      return res.status(200).json({
        data: profileData,
        message: "profile data fetched successfully",
        success: true,
        error: false,
      });
    } else {
      return res.status(400).json({
        message: "unable to fetch profile data",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// add student
adminRouter.post("/addstudent", async (req, res) => {
  try {
    const studentData = {
      name: req.body.name,
      age: req.body.age,
      class: req.body.class,
      rollnumber: req.body.rollnumber,
      gender: req.body.gender,
    };

    const existingRollnumber = await studentModel.findOne({
      rollnumber: studentData.rollnumber,
    });
    if (existingRollnumber != null) {
      return res.status(409).json({
        message: "rollnumber already assigned",
        success: false,
        error: true,
      });
    }

    const saveStudentData = studentModel(studentData).save();
    if (saveStudentData) {
      return res.status(201).json({
        message: "student data saved successfully",
        success: true,
        error: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// list student data
adminRouter.get("/list-student-data", async (req, res) => {
  try {
    await studentModel.find().then((studentData) => {
      if (studentData) {
        return res.status(200).json({
          data: studentData,
          message: "student data fetched successfully",
          success: true,
          error: false,
        });
      } else {
        return res.status(404).json({
          message: "student list is empty",
          success: false,
          error: true,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// view student details
adminRouter.get("/view-student-details/:id", async (req, res) => {
  const student_id = req.params.id;
  try {
    const studentDetails = await studentModel.findById(student_id);
    if (studentDetails) {
      return res.status(200).json({
        data: studentDetails,
        message: "student details fetched successfully",
        success: true,
        error: false,
      });
    } else {
      return res.status(404).json({
        message: "unable to fetch student details",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// update student details
adminRouter.put("/update-student-details/:id", async (req, res) => {
  const student_id = req.params.id;
  const newData = req.body;
  console.log(student_id, "id");
  try {
    const updateData = await studentModel.findByIdAndUpdate(student_id, newData, { new: true });
    if (updateData) {
      return res.status(200).json({
        message: "student details updated successfully",
        success: true,
        error: false,
      });
    } else {
      return res.status(404).json({
        message: "unable to update student details",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// delete student data
adminRouter.delete("/delete-student/:id", async (req, res) => {
  const student_id = req.params.id;
  try {
    const deleteData = await studentModel.findByIdAndDelete(student_id);
    if (deleteData) {
      return res.status(200).json({
        message: "student data deleted successfully",
        success: true,
        error: false,
      });
    } else {
      return res.status(400).json({
        message: "failed to delete student data",
        success: true,
        error: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
