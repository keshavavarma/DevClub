const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
// @route   GET api/auth
// @desc    Test route
// @access  public (token not required)
router.get("/", auth, (req, res) => res.send("auth route"));

module.exports = router;
