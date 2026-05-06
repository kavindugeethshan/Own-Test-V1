import { CreateProductService, getAllProductService } from "./product.service.js";

export const CreateProductController = async (req, res) => {
    try {
        // get the product details come from frontend 
        const productData = req.body;

        // get the admin id from the token (Error එක එන එක නවත්වන්න දෙකම බලනවා)
        const adminId = req.user.id || req.user._id;

        // send the data to service
        const newProduct = await CreateProductService(productData, adminId);

        // send response to frontend (201 Created දාන එක තමයි standard එක)
        return res.status(201).json({
            message: "Product added successfully",
            product: newProduct
        });

    } catch (error) {
        // 400 දාන එක වඩාත් සුදුසුයි
        return res.status(400).json({ message: error.message });
    }
}
// 2. Get all products controller
export const getAllProductController = async (req, res) => {
    try {
        const products = await getAllProductService();
        return res.status(200).json({
            message: "Products fetched successfully",
            products
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}