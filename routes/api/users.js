const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const auth = require("../../middleware/auth");

const JWT_SECRET = config.JWT_SECRET;
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
      return res
        .status(400)
        .json(
          "All Fields are required and password length should be 6 or more characters"
        );
    }
    const { name, email, password } = req.body;
    try {
      // check if user already registered
      let user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json("User already exits");
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
        res.json(token);
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route   PUT api/users/follow
// @desc    follow User
// @access  Private

router.put("/follow", auth, async (req, res) => {
  try {
    const followed = await User.findByIdAndUpdate(
      req.body.followID,
      {
        $push: { followers: req.user.id },
      },
      {
        new: true,
      }
    );
    const following = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: { following: req.body.followID },
      },
      {
        new: true,
      }
    );
    const response = {
      followed,
      following,
    };
    res.json(response);
  } catch (error) {
    console.log(error.message);
    res.json(500).json("Server error");
  }
});

// @route   PUT api/users/unfollow
// @desc    unfollow User
// @access  Private

router.put("/unfollow", auth, async (req, res) => {
  try {
    const unfollowed = await User.findByIdAndUpdate(
      req.body.followID,
      {
        $pull: { followers: req.user.id },
      },
      {
        new: true,
      }
    );
    const unfollowing = await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: { following: req.body.followID },
      },
      {
        new: true,
      }
    );
    const response = {
      unfollowed,
      unfollowing,
    };
    res.json(response);
  } catch (error) {
    console.log(error.message);
    res.json(500).json("Server error");
  }
});

module.exports = router;
