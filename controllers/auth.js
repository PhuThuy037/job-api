const { use } = require("express/lib/router");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError, BadRequestError } = require("../errors");
const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  console.log(token);
  res.status(StatusCodes.CREATED).json({ user: user.name, token });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid email or password");
  }
  // compare pass
  const isPassCorrect = await user.comparePassword(password);

  if (!isPassCorrect) {
    throw new UnauthenticatedError("Invalid email or password");
  }
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ name: { name: user.name }, token });
};
module.exports = { login, register };
