import { createUserService, loginUserService } from "./User.Service.js";

// CREATE USER CONTROLLER
export async function createUser(req, res) {
  try {
    const newUser = await createUserService(req);

    return res.status(201).json({
      message: "User created successfully",
      user: newUser
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}

// LOGIN USER CONTROLLER
export async function loginUser(req, res) {
  try {
    const token = await loginUserService(req);

    return res.status(200).json({
      message: "Login successful",
      token: token
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}

// GET USER PROFILE CONTROLLER
export async function getUserProfile(req, res) {
  try {
    // Middleware puts the logged-in user’s data into req.user
    return res.status(200).json({
      message: "Profile details fetched successfully",
      user: req.user
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
}