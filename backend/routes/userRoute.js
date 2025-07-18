const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth");

router.post("/signup", async (req, res) => {
  console.log("Incoming signup data:", req.body);
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    const { fname, lname, email, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Passwords do not match", success: false });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newUser = new User({
      fname,
      lname,
      email,
      gender,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send({
      message: "Account created successfully",
      success: true,
      user: {
        fname: newUser.fname,
        lname: newUser.lname,
        email: newUser.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not Exist!", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Incorrect Password", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      return res
        .status(200)
        .send({ message: "Login Successful", success: true, data: token });
    }
    res.status(201).json({ message: "welcome", user: { fname, lname, email } });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Login Error", success: false, error: error.message });
  }
});

router.post("/get-user-info-by-id", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({
        message: " ",
        success: true,
        data: user
      });
    }
  } catch (error) {
    return res.status(500).send({ message: "Auth Failed", success: false });
  }
});
module.exports = router;
