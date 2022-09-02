const User = require("../model/User");
const bcrypt = require("bcryptjs");
exports.getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    return console.log("error", error);
  }

  if (!users) {
    return res.status(404).json({ message: "No users found " });
  }
  return res.status(200).json({ users });
};

exports.signUpUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUsers;
  try {
    existingUsers = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }

  //user already exist with the email
  if (existingUsers) {
    return res.status(400).json({ message: " User Already Exists !" });
  }

  //create hashed password
  const hashedPassword = bcrypt.hashSync(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });

  try {
    await user.save();
  } catch (error) {
    return console.log(error);
  }

  return res.status(201).json({ user });
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "Couldn't  find User !" });
  }

  //compare password
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  return res.status(200).json({ message: "Login successful !" });
};
