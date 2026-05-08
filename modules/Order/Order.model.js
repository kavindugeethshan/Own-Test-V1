import mongoose, { mongo } from "mongoose";

// details inside the order
const orderItemSchema = new mongoose.Schema({
ProductId:{
type: mongoose.Schema.Types.ObjectId,
ref:"Product",
required: true
},

name:{
type:String,    //save name of the product in order item schema 
required: true  //because if the product is deleted then we can not get the name of the product
},

quantity:{
type:Number,
required: true
},
price:{
    type:Number,
    required:true
},

});

//whole order details 
const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    items:[orderItemSchema], //order items array

    //addres details of customer order
    shipingAddress:{
    address:{type:String ,required:true},
    city:{type:String ,required:true},
    postalCode:{type:String ,required:true},
    phone:{type:String,required:true},
    },

    paymentMethod:{
        type:String,
        required:true,
        enum:["Card","Cash On Delivery"],
        default:"Card",
    },

    paymentStatus:{
        type:String,
        required:true,
        enum:["pending","paid","failed"],
        default:"pending",
    },

    orderStatus:{
        type:String,
        required:true,
        enum:["processing","shipped","delivered","cancelled"],
        default:"processing",
    },
},
{timestamps:true}
);

const order = mongoose.model("Order",orderSchema);
export default Order;


