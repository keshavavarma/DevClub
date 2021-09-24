const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const JWT_SECRET = config.get("JWT_SECRET");
const router = express.Router();

// @route   POST api/users
// @desc    user registration
// @access  public (token not required)
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "please enter a valid email address").isEmail(),
    check("password", "password must be more than 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      // check if user already registered
      let user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exits" }] });
      }
      //get user's gravatar
      // const avatar = gravatar.url(email, {
      //   s: "200",
      //   r: "pg",
      //   d: "mm",
      // });

      // create user instance
      user = new User({
        name,
        email,
        password,
        // avatar,
      });
      // encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
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
        res.json({ token });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
