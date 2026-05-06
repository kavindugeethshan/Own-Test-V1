import express from "express";
import { CreateProductController, getAllProductController } from "./product.controllers.js";
//middlewares
import authenticate from "../../middlewares/authenticate.js";
import isAdmin from "../../middlewares/isAdmin.js";

const productRouter = express.Router();

//routes
productRouter.get("/all", getAllProductController);
productRouter.post("/add", authenticate, isAdmin, CreateProductController);

export default productRouter;