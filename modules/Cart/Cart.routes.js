import express from "express";
import { addToCartController } from "./Cart.Controllers.js";
import authenticate from "../../middlewares/authenticate.js";
const router = express.Router();

// Route: POST /cart/add
// Description: Add an item to the user's cart
// Access: Private (Requires Token)
router.post("/add", authenticate, addToCartController);

export default router;