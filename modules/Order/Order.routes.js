import express from 'express';
import { placeOrderController } from './Order.controller.js';
import authenticate from "../../middlewares/authenticate.js";

const router = express.Router();

//place order route
router.post("/place",authenticate,placeOrderController);

export default router;
