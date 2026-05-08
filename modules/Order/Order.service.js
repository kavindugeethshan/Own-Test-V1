import Order from "./Order.model.js";
import Cart from "../Cart/Cart.model.js";
import { clearCart } from "../Cart/Cart.service.js";    

// Function for creating a new order
export const placeOrder = async (userId, shippingAddress, paymentMethod) => {
  try {
    // 1. කැපිටල්/සිම්පල් වැරදි හැදුවා (UserId -> userId, ProductId -> productId)
    const cart = await Cart.findOne({ userId: userId }).populate({
      path: "items.productId",
      select: "name price",
    });

    // check cart empty or not
    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty and please add items to checkout");
    }

    // remake the order items and calculate the total price
    let secureTotal = 0;

    const orderItems = cart.items.map((item) => {
      // handle the product was deleted on database
      if (!item.productId) {
        throw new Error(
          "Product not found in order item. Please remove it from cart.",
        );
      }

      // 2. අඩුවෙලා තිබ්බ Total එක ගණනය කරන කෑල්ල දැම්මා
      const itemTotal = item.quantity * item.productId.price;
      secureTotal += itemTotal;

      return {
        productId: item.productId._id,
        name: item.productId.name,
        quantity: item.quantity,
        price: item.productId.price,
      };
    });

    // save the new order in db 
    const newOrder = new Order({
        userId,
        items: orderItems,
        shippingAddress, // 3. අක්ෂර වින්‍යාසය හැදුවා
        paymentMethod,
        totalPrice: secureTotal, // 4. totalPtice එක totalPrice කළා
        paymentStatus: "Pending", // 5. Model එකේ තියෙන විදිහට Capital P දැම්මා
        orderStatus: "Processing", // 5. Model එකේ තියෙන විදිහට Capital P දැම්මා
    });

    await newOrder.save();

    // clear the user cart after place order
    await clearCart(userId);
    return newOrder;

  } catch (error) {
    throw error;
  }
};