import { addToCart } from "./Cart.service.js";

/**
 * POST /cart/add
 * Body: { UserId, ProductId, quantity }
 */
export const addToCartController = async (req, res) => {
  try {
    const { UserId, ProductId, quantity } = req.body;

    if (!UserId || !ProductId) {
      return res
        .status(400)
        .json({ message: "UserId and ProductId are required" });
    }

    const qty = Number(quantity);
    if (!Number.isFinite(qty) || qty < 1) {
      return res
        .status(400)
        .json({ message: "quantity must be a number >= 1" });
    }

    const cart = await addToCart(UserId, ProductId, qty);
    return res.status(200).json({ message: "Added to cart", cart });
  } catch (error) {
    return res.status(500).json({
      message: error?.message || "Internal service error",
    });
  }
};
