const asyncHanler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const Form = require("../models/ApplicationForm");

// register a user
const registerUser = asyncHanler(async (req, res, next) => {
  const { name, email, passwd } = req.body;
  if (!name || !email || !passwd) {
    res.status(400);
    throw new Error("Enter all fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ msg: "Email is already registerd" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(passwd, salt);
  const user = await User.create({
    name,
    email,
    passwd: hashedPassword,
  });
  res.status(200).json({ msg: "User is created" });
});

// login user
const loginUser = asyncHanler(async (req, res, next) => {
  const { email, passwd } = req.body;
  if (!email || !passwd) {
    res.status(400);
    throw new Error("Enter all fields");
  }
  const userExists = await User.findOne({ email });
  if (!userExists) {
    return res.status(400).json({ msg: "Email is not registerd" });
  }
  if (!userExists.isAdmin) {
    const result = await bcrypt.compare(passwd, userExists.passwd);
    if (!result) {
      return res.status(400).json({ msg: "password is incorrect" });
    }
  } else {
    if (userExists.passwd !== passwd) {
      return res.status(400).json({ msg: "password is incorrect" });
    }
  }
  res.status(200).json({
    _id: userExists._id,
    name: userExists.name,
    email: userExists.email,
    isAdmin: userExists.isAdmin,
    token: generateAccessToken(userExists._id),
    refershToken: generateRefreshToken(userExists._id),
  });
});

// get current user
const getUser = asyncHanler(async (req, res, next) => {
  res.status(200).json(req.user);
});

// create form
const createForm = asyncHanler(async (req, res, next) => {
  const {
    name,
    address,
    city,
    state,
    email,
    companyname,
    phoneno,
    problem,
    products,
    solution,
    team,
    valueproposition,
    competitors,
    revenuemodel,
    potentialmarketsize,
    marketplan,
    incubationtype,
    businessproposal,
  } = req.body;

  if (
    !name ||
    !address ||
    !city ||
    !state ||
    !email ||
    !companyname ||
    !phoneno ||
    !problem ||
    !products ||
    !solution ||
    !team ||
    !valueproposition ||
    !competitors ||
    !revenuemodel ||
    !potentialmarketsize ||
    !marketplan ||
    !incubationtype ||
    !businessproposal
  ) {
    return res.status(400);
    throw new Error("Enter all fields");
  }
  req.body.owner = req.user._id;
  const form = await Form.create(req.body);
  res.status(200).json({ form });
});

// generate access token
const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20d",
  });
};

// generate refresh token
const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "10d",
  });
};
module.exports = {
  registerUser,
  loginUser,
  getUser,
  createForm,
};
