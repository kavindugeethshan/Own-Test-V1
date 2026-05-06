import Product from "./product.modell.js";

// 1. Add new product
export const CreateProductService = async (productData, adminId) => {
    try {
        //the data send by front end add the admin id for them 
        const newProduct = new Product({
            ...productData,
            userId: adminId
        });

        await newProduct.save();
        return newProduct;

    } catch (error) {
        throw new Error("Have a error when add product: " + error.message);
    }
}
//2.Get all products
export const getAllProductService = async () => {
    try {
        // get all data from database
        const product = await Product.find();
        return product;

    } catch (error) {
        throw new Error("Have error when get all product: " + error.message);
    }
}



