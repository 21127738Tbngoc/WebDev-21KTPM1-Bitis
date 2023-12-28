const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
            id: { type: String, required: true, unique: true },
            name: { type: String, required: true, unique: true },
            description: { type: String, required: true },
            price: { type: Number, required: true },
            tags: { type: Array, required: false },
            images: { type: Array, required: true },
            categories: { type: Array, required: false },
            quantity: { type: Number, default: 0 },
            status: { type: String, required: false },
            date: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
