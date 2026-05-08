import { placeOrder } from "./Order.service.js";

//order place
export const placeOrderController =async (req,res) =>{
    try{
       // get id from token
       const userId = res.user._id;

       //get shiping and payment details from the body
       const {shipingAddress,paymentMethod} = req.body;

       // validation for everything in adress 
       if(
        !shipingAddress ||
        !shipingAddress.address ||
        !shipingAddress.city ||
        !shipingAddress.postalCode ||
        !shipingAddress.phone
       
       ){
        return res.status(400).json({
            success:false,
            message:"please provide complete shiping address details"
        });
       }


       //if does not select the payment method and get default card and send service
       const order = await placeOrder(userId,shipingAddress,paymentMethod || "card");

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