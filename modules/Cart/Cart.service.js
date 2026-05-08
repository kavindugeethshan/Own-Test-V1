import Cart from "./Cart.model.js";
import Product from "../Product/product.modell.js";

export const addToCart = async (userId, productCode, quantity) => {
  try {
    // fetch the product to get the price
    const product = await Product.findOne({ ProductId: productCode });
    if (!product) {
      throw new Error("Product not found");
    }

    const productId = product._id;
    const price = product.price;

    //check if have cart for the User
    let cart = await Cart.findOne({ userId });

    //if have not cart crate new cart for the user
    if (!cart) {
      const newCart = new Cart({
        userId,
        items: [{ productId: productId, quantity, price }],
        totalPrice: price * quantity,
      });
      return await newCart.save();
    }

    //if cart have  and  product exist in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    //if product have then update the quantity and total price
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
      //if product have not add to the cart then add new array of product to the cart
    } else {
      cart.items.push({ productId: productId, quantity, price });
    }

    //lets calculate the total price of the cart
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity, 0
    );

    //save the update cart
    return await cart.save();

  } catch (error) {
    throw error;
  }
};



  //watch the User Cart 
export const getUserCart = async (userId) => {
  try {
    // find cart and populate product details
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.productId",
      select: "name images ProductId",
    });

    // if no cart found
    if (!cart) {
      return {
        userId,
        items: [],
        totalPrice: 0,
      };
    }

    return cart;
  } catch (error) {
    throw error;
  }
};





//remove from cart
export const removeFromCart = async (userId, productCode) => {
  try {

    // find the product from the productcode
    const product = await Product.findOne({ ProductId: productCode });

    if (!product) {
      throw new Error("Product not found");
    }

    const productId = product._id;

    //find the cart of the user
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new Error("Cart not found for the user");
    }

    //get the all items in one array without the product which want to Remove
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId.toString()
    );

    //calculate the total price of the cart after remove the product
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    //Update the cart after remove the product
    return await cart.save();

  } catch (error) {
    throw error;
  }
};