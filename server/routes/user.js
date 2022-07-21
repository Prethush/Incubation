const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { verifyToken } = require("../middleware/auth");
const {
  registerUser,
  loginUser,
  getUser,
  createForm,
} = require("../controllers/userController");
// register user
router.post("/register", registerUser);
// login user
router.post("/login", loginUser);
// get user
router.get("/get-user", verifyToken, getUser);
// create a form
router.post("/form", verifyToken, createForm);
module.exports = router;
