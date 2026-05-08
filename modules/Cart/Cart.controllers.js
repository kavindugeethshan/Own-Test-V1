import express from "express";
import { addToCart, getUserCart, removeFromCart } from "./Cart.service.js";

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
      return res
        .status(400)
        .json({ message: "quantity must be a number >= 1" });
    }

    const cart = await addToCart(userId, productCode, qty);
    return res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    return res.status(500).json({
      message: error?.message || "Internal server error",
    });
  }
};

/*
GET/cart/
Header :Authentication Bearer token
 */

export const getUserCartController = async (req, res) => {
  try {
    // get user id from token
    const userId = req.user._id || req.user.id;

    //get the cart for the user
    const cart = await getUserCart(userId);

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal server error",
    });
  }
};

/* DELETE /cart/remove/:productCode
 * Header: Authorization Bearer Token
 */
export const removeFromCartController = async (req, res) => {
  try {
    //get the productcode from params
    const {productCode} = req.params;

    //get the user id from token 
    const userId = req.user._id || req.user.id;

    //remove the item from cart
    const cart = await removeFromCart(userId, productCode);
    
    return res.status(200).json({
      success: true,
      message:"Item removed from the cart successfully",
      cart
    })


    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal service error",
    });
  }
};
