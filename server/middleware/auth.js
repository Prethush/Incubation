const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const verifyToken = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  try {
    if (token) {
      const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = await User.findById(decoded.id).select("-passwd");
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(401);
    throw new Error("invalid token");
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { verifyToken };
