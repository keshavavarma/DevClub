const express = require("express");
const auth = require("../../middleware/auth");
const axios = require("axios");
const config = require("config");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const router = express.Router();

// @route   GET api/profile/me
// @desc    get logged in user profile
// @access  private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await User.findById(req.user.id).select("-password");
    console.log("/me", req.user.id);
    if (!profile) {
      return res.status(400).json({ msg: "Profile is not available" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   PUT api/profile/
// @desc    update user profile
// @access  private

router.put("/", auth, async (req, res) => {
  const { name, password, bio, picture } = req.body;

  const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;
  };
  const profileFields = {};
  if (name) profileFields.name = name;
  if (picture) profileFields.picture = picture;
  if (bio) {
    if (bio.length <= 120) {
      profileFields.bio = bio;
    } else {
      return res.status(400).send("Bio can be maximum 120 characters long");
    }
  }
  if (password) {
    if (password.length >= 6) {
      profileFields.password = await encryptPassword(password);
    } else {
      return res.status(400).send("Password length should be greater than 6");
    }
  }

  try {
    // update
    let user = await User.findById(req.user.id);
    if (user) {
      console.log("update phase", req.user.id);
      user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: profileFields },
        { new: true }
      ).select("-password");
      return res.json(user);
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  }
});

// @route   GET api/profile
// @desc    get all profiles
// @access  public
router.get("/", async (req, res) => {
  try {
    const profiles = await User.find().select("-password");
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   GET api/profile/user/:user_id
// @desc    get profile by user_id
// @access  public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await User.findById(req.params.user_id).select("-password");
    if (!profile) return res.status(400).send("Profile not Found");
    res.json(profile);
  } catch (err) {
    if (err.kind === "ObjectId") {
      console.error(err.message);
      return res.status(400).send("Profile not Found");
    }
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/profile
// @desc    Delete profile and user
// @access  private
router.delete("/", auth, async (req, res) => {
  try {
    // TODO: Delete posts
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
