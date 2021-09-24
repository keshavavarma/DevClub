const jwt = require("jsonwebtoken");
const config = require("config");

const JWT_SECRET = config.get("JWT_SECRET");

module.exports = function (req, res, next) {
  // get the token
  const token = req.header("x-auth-token");
  // check if token is present
  if (!token) {
    res
      .status(401)
      .json({ errors: [{ msg: "No token, authorization denied" }] });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    // TODO: remove later
    console.log("In Auth middleware,this is req.user =", req.user);
    next();
  } catch (error) {
    res.status(401).json({ errors: [{ msg: "Invalid Token" }] });
  }
};
