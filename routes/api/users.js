const express = require("express");
const { check, validationResult } = require("express-validator/check");
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
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("user route");
  }
);

module.exports = router;
