const mongoose = require('mongoose');

const Feedback = mongoose.model('Feedback', new mongoose.Schema(
    {
        id: {type: Number, required: true, unique: true},
        user_id: {type: String, required: true, unique: true},
        user_name: String,
        product_id: {type: String, required: true},
        date: Date,
        rating: Number,
        comments: String,
    }
));

module.exports = Feedback;