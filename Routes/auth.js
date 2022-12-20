const express = require("express");

const router = express.Router();

const db = require("../db");

const Form = db.get("users");

const Schema = require("../Models/Auth");

const bcrypt = require("bcryptjs");

const nodeMailer = require("nodemailer");

const email = "meshramvikas744@gmail.com";

const key = "wkkljsrjmdredawb";

const jwt = require("jsonwebtoken");

const fetchuser = require("../middlewares/middleware");

// const nodeMailer = require("nodemailer");

// Available routes
// Route 1 : Create User using POST : "/api/auth/createUser"
router.post("/createUser", async (req, res) => {
  try {
    // validate the body
    const user = await Schema.validateAsync(req.body);
    if (user) {
      // find if EMAIL already exist
      const isExist = await Form.findOne({ email: req.body.email });
      if (isExist) {
        return res.status(403).json({
          message: "User Alredy Exist",
        });
      }

      //   Hash the Password
      const secPass = await bcrypt.hash(req.body.password, 10);
      user.password = secPass;

      //   insert to DB;
      user.created_on = new Date().toLocaleString(); // when user was created
      const created = await Form.insert(user);

      //   send feedback mail to the user
      const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
          user: email,
          pass: key,
        },
      });

      const message = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "feedback message",
        text: "You are now sucessfully registered ... Thanks for choosing us...🌱",
      };

      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("email sent", info.response);
        }
      });

      return res.status(201).json({
        message: "User Registered Successfully ",
      });
    }
    return res.status(422).json({
      message: "Try to register with valid credentials",
    });
  } catch (error) {
    return res.status(403).json({
      message: "Some Internal Server Error",
      error: error.message,
    });
  }
});

// Route 2 : User login using POST : "/api/auth/userLogin"

router.post("/userLogin", async (req, res) => {
  try {
    // find the user
    const user = await Form.findOne({ email: req.body.email });
    if (user) {
      // compare the password
      const isValidKey = await bcrypt.compare(req.body.password, user.password);
      if (!isValidKey) {
        return res.status(403).json({
          message: "Try to login with valid credentials",
        });
      }

      //   send feedback mail to the user
      const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
          user: email,
          pass: key,
        },
      });

      const message = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "feedback message",
        text: "Your are not logged in...🌱",
      };

      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("email sent", info.response);
        }
      });

      //   jwt area
      const data = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };

      const authToken = jwt.sign(data, process.env.JWT_SECRET);
      //   user logged in done
      return res.status(201).json({
        message: "User Logged Successfully ",
        token: authToken,
      });
    }
    return res.status(404).json({
      message: "Try to login with valid credentials User not found",
    });
  } catch (error) {
    return res.status(403).json({
      message: "Some Internal Server Error",
      error: error.message,
    });
  }
});

// Route 3 : Fetch user usign GET : "/api/auth/userProfile"
router.get("/userProfile", fetchuser, async (req, res) => {
  try {
    const user = await Form.findOne({
      _id: req.user._id,
    });
    res.json(user);
  } catch (error) {
    return res.status(403).json({
      message: "Some Internal Server Error",
      error: error.message,
    });
  }
});

// Route 4 : fetch all the user
router.get("/getAllUsers", fetchuser, async (req, res) => {
  try {
    const items = await Form.find();
    res.json(items);
  } catch (error) {
    return res.status(403).json({
      message: "Some Internal Server Error",
      error: error.message,
    });
  }
});

module.exports = router;
