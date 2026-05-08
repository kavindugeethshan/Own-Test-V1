import Order from "./Order.model";
import Cart from "../Cart/Cart.model";
import { clearCart } from "../Cart/Cart.service";

//Function for creating a new order
export const placeOrder = async (userId, shipingAddress, paymentMethod) => {
  try {
    //find the user cart and populate the product name and price
    const cart = await Cart.findOne({ UserId }).populate({
      path: "items.ProductId",
      select: "name price",
    });

    //check cart emty or not
    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty and please add items to checkout");
    }

    //remake the order items and calculate the total price
    let secureTotal = 0;

    const orderItems = cart.items.map((item) => {
      //handle the product was deleted on database
      if (!item.productId) {
        throw new Error(
          "product not found in order item and please remove it from cart",
        );
      }

      //calculate the acutal total from using database
      return {
        productId: item.productId._id,
        name: item.productId.name,
        quantity: item.quantity,
        price: item.productId.price,
      };
    });

    //save the new order in db 
    const newOrder =new Order({
        userId
        items:orderItems,
        shipingAddress,
        paymentMethod,
        totalPtice:secureTotal,
        paymentStatus:"pending",
        orderStatus:"processing",
    });

    await newOrder.save();

    //clear the user cart after place order
    await clearCart(userId);
    return newOrder;

    
  } catch (error) {
    throw error;
  }
};
