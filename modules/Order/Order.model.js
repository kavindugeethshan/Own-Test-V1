import mongoose from "mongoose";

// details inside the order
const orderItemSchema = new mongoose.Schema({
  productId: { // සිම්පල් p කරා (Service එකට ගැලපෙන්න)
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  name: {
    type: String, 
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

// whole order details 
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  
  items: [orderItemSchema],

  // address details of customer order
  shippingAddress: { // p අකුරු දෙකක් දැම්මා (Service එකට ගැලපෙන්න)
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String, required: true }
  },

  paymentMethod: {
    type: String,
    required: true,
    enum: ["Card", "card", "Cash On Delivery"],
    default: "Card"
  },

  paymentStatus: {
    type: String,
    required: true,
    enum: ["Pending", "Paid", "Failed"], // Capital P කරා (Service එකට ගැලපෙන්න)
    default: "Pending"
  },

  orderStatus: {
    type: String,
    required: true,
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"], // Capital P කරා
    default: "Processing"
  },
  
  totalPrice: { // ඔයාගේ එකේ අඩුවෙලා තිබ්බ Total Price එක මෙතනට දැම්මා
    type: Number,
    required: true
  }
},
{ timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;