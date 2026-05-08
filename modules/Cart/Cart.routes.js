import express from "express";
import { addToCartController ,getUserCartController,removeFromCartController} from "./Cart.Controllers.js";
import authenticate from "../../middlewares/authenticate.js";
const router = express.Router();

// Route: GET /cart/
// Description: Get logged in user's cart
// Access: Private (Requires Token)
router.get("/", authenticate, getUserCartController);

// Route: POST /cart/add
// Description: Add an item to the user's cart
// Access: Private (Requires Token)
router.post("/add", authenticate, addToCartController);

// Route: DELETE /cart/remove/:productCode
// Description: Remove an item from the user's cart
// Access: Private (Requires Token)
router.delete("/remove/:productCode", authenticate, removeFromCartController);

export default router;