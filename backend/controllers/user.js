const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");
const {
  BadRequestError,
  UnauthenticatedError,
  InternalServerError,
} = require("../errors");
const md5 = require('md5');

const User = require('../models/user')


const dashboard = async (req, res) => {
  const id = req.jwt.payload.sub;

  let user;
  try {
    user = await User.findById(id);
  } catch (error) {
    console.log(error);
    throw new InternalServerError("Error in fetching user, Try again later.");
  }

  if (user.role == "admin"){
    let allUser;
    try {
      allUser = await User.find({});
    } catch (error) {
      console.log(error);
      throw new InternalServerError("Error in fetching user, Try again later.");
    }
    res.status(StatusCodes.OK).json({ success: true, role: "admin", name: user.userid ,data: allUser });
  }else{
    res.status(StatusCodes.OK).json({ success: true, role: "basic", name: user.userid , data: user });
  }
}


const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new BadRequestError("Input Validation failed, provide all the input fields correctly");
  }

  let userExist;
  try {
    userExist = await User.findOne({ userid: req.body.userid });
  } catch (error) {
    console.log(error);
    throw new InternalServerError("Error in creating user, Try again later.");
  }

  if (userExist) {
    throw new BadRequestError("There already an account exists with this userid. Try different userid.");
  }

  const { userid, password, role } = req.body;
  const password_hash = md5(password);
  const user = new User({ userid, password_hash, role });
  let createdUser;
  try {
    createdUser = await user.save();
  }
  catch (error) {
    console.log(error);
    throw new InternalServerError("Error in creating user, Try again later.");
  }
  res.status(StatusCodes.CREATED).json({ success: true, data: createdUser });
}


module.exports = {
  dashboard,
  createUser,
};