import express from 'express';
import mongoose from 'mongoose';
import UserRouter from './modules/User/User.routes.js';
import ProductRouter from './modules/Product/product.routes.js';
import CartRotes from "./modules/Cart/Cart.routes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// 1. Connect MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI).then(() => {
    console.log("MongoDB connected successfully now");
}).catch((err) => {
    console.log("MongoDB connection failed:", err);
});

app.use("/Users", UserRouter);
app.use("/products", ProductRouter);
app.use("/Cart", CartRotes)

// 3. Server Start
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});



