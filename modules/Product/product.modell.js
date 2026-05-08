import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        ProductId: {
            type: String,
            required: true,
            unique: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },


        name: {
            type: String,
            required: true,
        },

        alternateName: {
            type: [String],
            default: [],
            required: true
        },

        description: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        labelPrice: {
            type: Number,
            required: true
        },

        isAvailable: {
            type: Boolean,
            required: true,
            default: false
        },

        category: {
            type: String,
            required: false
        },

        brand: {
            type: String,
            required: false
        },

        images: {
            type: [String],
            default: ["/default-product-1.png", "/default-product-2.png", "/default-product-3.png"],
            required: true
        },

        stock: {
            type: Number,
            required: true,
            default: 0
        },

        model: {
            type: String,
            required: false
        },
        productCode: {
            type: String,
            required: true,
            unique: true,  // P001, P002, P003...
        }
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;