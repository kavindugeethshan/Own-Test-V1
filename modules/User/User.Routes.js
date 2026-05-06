import express from "express";
import { createUser, loginUser, getUserProfile } from './User.Controller.js';
import authenticate from '../../middlewares/authenticate.js';

const UserRouter = express.Router();

UserRouter.get("/profile", authenticate, getUserProfile);

UserRouter.post("/register", createUser);
UserRouter.post("/login", loginUser);

export default UserRouter;