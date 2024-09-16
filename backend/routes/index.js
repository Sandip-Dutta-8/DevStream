var express = require('express');
var router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require('../models/user.model');
const Project = require('../models/project.model');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/signUp", async (req, res) => {
  let { username, name, email, password } = req.body;
  let emailCon = await User.findOne({ email: email });
  if (emailCon) {
    return res.json({ success: false, message: "Email already exists" });
  }
  else {

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        let user = User.create({
          username: username,
          name: name,
          email: email,
          password: hash
        });

        return res.json({ success: true, user, message: "User created successfully" });
      });
    });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email: email });

  if (user) {
    // Rename the second `res` to avoid conflict
    bcrypt.compare(password, user.password, function (err, isMatch) {
      if (err) {
        return res.json({ success: false, message: "An error occurred", error: err });
      }
      if (isMatch) {
        let token = jwt.sign({ email: user.email, userId: user._id }, 'sandipdutta');
        return res.json({ success: true, message: "User logged in successfully", token: token, userId: user._id });
      } else {
        return res.json({ success: false, message: "Invalid email or password" });
      }
    });
  } else {
    return res.json({ success: false, message: "User not found!" });
  }
});

router.post("/getUserDetails", async (req, res) => {
  console.log("Called")
  let { userId } = req.body;
  let user = await User.findOne({ _id: userId });
  if (user) {
    return res.json({ success: true, message: "User details fetched successfully", user: user });
  } else {
    return res.json({ success: false, message: "User not found!" });
  }
});

router.post("/createProject", async (req, res) => {
  let { userId, title } = req.body;
  let user = await User.findOne({ _id: userId });
  if (user) {
    let project = await Project.create({
      title: title,
      createdBy: userId
    });
    return res.json({ success: true, message: "Project created successfully", projectId: project._id });
  }
  else {
    return res.json({ success: false, message: "User not found!" });
  }
});

router.post("/getProjects", async (req, res) => {
  let { userId } = req.body;
  let user = await User.findOne({ _id: userId });
  if (user) {
    let projects = await Project.find({ createdBy: userId });
    return res.json({ success: true, message: "Projects fetched successfully", projects: projects });
  }
  else {
    return res.json({ success: false, message: "User not found!" });
  }
});

router.post("/deleteProject", async (req, res) => {
  let { userId, progId } = req.body;
  let user = await User.findOne({ _id: userId });
  if (user) {
    let project = await Project.findOneAndDelete({ _id: progId });
    return res.json({ success: true, message: "Project deleted successfully" });
  }
  else {
    return res.json({ success: false, message: "User not found!" });
  }
});

router.post("/getProject", async (req, res) => {
  try {
    const { userId, projId } = req.body;

    // Validate request body
    if (!userId || !projId) {
      return res.status(400).json({ success: false, message: "Invalid request. User ID and Project ID are required." });
    }

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    // Find project by ID
    const project = await Project.findById(projId);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found!" });
    }

    // Return project data
    return res.status(200).json({
      success: true,
      message: "Project fetched successfully",
      project: project
    });

  } catch (err) {
    // Catch and return any server errors
    console.error("Error fetching project:", err);
    return res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
});


router.post("/updateProject", async (req, res) => {
  let { userId, htmlCode, cssCode, jsCode, projId } = req.body;
  let user = await User.findOne({ _id: userId });

  if (user) {
    let project = await Project.findOneAndUpdate(
      { _id: projId },
      { htmlCode: htmlCode, cssCode: cssCode, jsCode: jsCode },
      { new: true } // This option returns the updated document
    );

    if (project) {
      return res.json({ success: true, message: "Project updated successfully" });
    } else {
      return res.json({ success: false, message: "Project not found!" });
    }
  } else {
    return res.json({ success: false, message: "User not found!" });
  }
});

module.exports = router;
