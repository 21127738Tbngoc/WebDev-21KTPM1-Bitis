const mongoose = require('mongoose');

const Order = mongoose.model('Order', new mongoose.Schema(
    {
        id: {type: Number, required: true, unique: true},
        user_id: {type: String, required: true},
        name: String,
        address: String,
        detail: Array,
        shipping_cost: Number,
        total_cost: Number,
        date: Date,
    }
));

module.exports = Order;