const mongoose = require("mongoose");

const OrderHistory = new mongoose.model('OrderHistory', new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: [
            {
                productId: {
                    type: String,
                },
                variant: {
                    color: { type: String },
                    size: { type: String },
                    pattern: { String },
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        subtotal: { type: Number, required: true },
        address: { type: Number, required: true },
        status: { type: String, default: "pending" },
        time: {type: Date, required: true}
    },
    { timestamps: true },
));

module.exports = mongoose.model('OrderHistory',OrderHistory);