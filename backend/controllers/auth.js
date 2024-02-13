const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");
const authenticate = require("../utils/auth/authenticate");
const {
  BadRequestError,
  UnauthenticatedError,
  InternalServerError,
} = require("../errors");

const User = require("../models/user");


// Login a User
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new BadRequestError("Please provide all the input fields correctly & Try Again!!");
  }

  const { userid, password_hash } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ userid: userid});
  } catch (err) {
    console.log(err);
    throw new InternalServerError("Login failed, please try again later.");
  }

  if (!existingUser) {
    throw new BadRequestError(
      "No account exists with this userid!!"
    );
  }

  const isValid = password_hash === existingUser.password_hash;

  if (isValid) {
    const tokenObject = authenticate.issueJWT(existingUser);
    res.status(StatusCodes.OK).json({success:true, msg: "Logged in Successfully!", data: tokenObject });
  } else {
    throw new BadRequestError(
      "Invalid Credentials, Please check your userid and Password"
    );
  }
};

module.exports = {
  login,
};
