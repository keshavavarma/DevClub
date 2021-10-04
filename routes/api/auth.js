const express = require("express");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("../../config/config");

const JWT_SECRET = config.JWT_SECRET;
const router = express.Router();

// @route   GET api/auth
// @desc    get logged-in user
// @access  private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  public

router.post(
  "/",
  [
    check("email", "please enter a valid email address").isEmail(),
    check("password", "password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json("Email or Password is not valid");
    }
    const { email, password } = req.body;
    try {
      // check if user exists
      let user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json("Invalid Credentials");
      }
      // check password match
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json("Invalid Credentials");
      }
      //return jwt
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 }, (error, token) => {
        if (error) {
          throw error;
        }
        res.json(token);
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
