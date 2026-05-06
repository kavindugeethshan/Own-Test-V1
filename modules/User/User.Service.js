import jwt from "jsonwebtoken";
import User from "./User.Model.js";
import bcrypt from "bcrypt";

// 1.CREATE USER SERVICE *********************************************
export const createUserService = async (req) => {
  const { email, firstName, lastName, password, isAdmin } = req.body;

  // check existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // hash password
  const passwordHash = bcrypt.hashSync(password, 10);

  // create user
  const newUser = new User({
    email,
    firstName,
    lastName,
    isAdmin: isAdmin || false,
    password: passwordHash,
  });

  await newUser.save();

  return newUser;
};

// 2.LOGIN SERVICE ********************************************************
export const loginUserService = async (req) => {
  const { email, password } = req.body;
  //check emaill and password have input
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  //find the user email in db 
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }
  //password compare 
  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  //after validation give token to the user 
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
    },
    process.env.jwt_secret_key,
  );

  return token;
};



