import Cart from "./Cart.model";
import Product from "../Product/Product.model";

export const addToCart = async (UserId, ProductId, quantity) => {
  try {
    //check if have cart for the User
    let Cart = await Cart.findone({ UserId });

    //if have not cart crate new cart for the user
    if (!Cart) {
      const newCart = new Cart({
        UserId,
        items: [{ ProductId, quantity, price }],
        totalPrice: Price * quantity,
      });
      return await newCart.save();
    }

    //if cart have  and  product exist in the cart
    const itemIndex = Cart.items.findIndex(
      (item) => item.productId.toString() == ProductId,
    );

    //if product have then update the quantity and total price
    if(itemIndex > -1){
        Cart.items[itemIndex].quantity += quantity;

        //if product have not add to the cart then add new array of product to the cart
    } else{
         Cart.items.push ({ProductId,quantity,Price}
         )
    }

    //lets calculate the total price of the cart
    Cart.totalPrice = Cart.items.reduce(
        (total,items) => total + items.price * items.quantity,0
    );

    //save the update cart
return await Cart.save();

  } catch (error) {
    throw error;
  }
};
