import { placeOrder } from "./Order.service.js";

//order place
export const placeOrderController =async (req,res) =>{
    try{
       // get id from token
       const userId = req.user._id || req.user.id;

       //get shipping and payment details from the body
       const {shippingAddress,paymentMethod} = req.body;

       // validation for everything in address 
       if(
        !shippingAddress ||
        !shippingAddress.address ||
        !shippingAddress.city ||
        !shippingAddress.postalCode ||
        !shippingAddress.phone
       
       ){
        return res.status(400).json({
            success:false,
            message:"please provide complete shipping address details"
        });
       }


       //if does not select the payment method and get default card and send service
       const order = await placeOrder(userId,shippingAddress,paymentMethod || "card");

       return res.status(201).json({
        success:true,
        message:"order places successfully",
        order,
       });


    }catch(error){
        res.status(500).json({message:error.message || "Internal server error",
            success:false
        });
    }
}