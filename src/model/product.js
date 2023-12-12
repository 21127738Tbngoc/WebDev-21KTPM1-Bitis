const mongoose = require('mongoose');

const Product = new mongoose.model("Product", new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true, },
        price: { type: Number, required: true },
        tags: { type: Array },
        images: { type: Array, required: true },
        categories: { type: Array },
        brand: { type: String },
        size: { type: String },
        color: { type: String },
        pattern: { type: String },
        feedback: [
            {
                user: { type: Object },
                order: { type: Object },
                rating: { type: Number },
                content: { type: String }
            },
        ],
    },
    { timestamps: true },
));

module.exports = mongoose.model('Product', Product);