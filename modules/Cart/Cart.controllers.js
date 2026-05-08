import { addToCart } from "./Cart.service.js";

/**
 * POST /cart/add
 * Body: { UserId, ProductId, quantity }
 */
export const addToCartController = async (req, res) => {
  try {
    const { productCode, quantity } = req.body;
    const userId = req.user._id || req.user.id;

    if (!productCode) {
      return res.status(400).json({ message: "productCode is required" });
    }

    const qty = Number(quantity);
    if (!Number.isFinite(qty) || qty < 1) {
      return res.status(400).json({ message: "quantity must be a number >= 1" });
    }

    const cart = await addToCart(userId, productCode, qty);
    return res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    return res.status(500).json({
      message: error?.message || "Internal server error",
    });
  }
};
