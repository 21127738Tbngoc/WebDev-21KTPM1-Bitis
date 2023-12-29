const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const User = mongoose.model("User", new mongoose.Schema(
    {
        id: { type: Number },
        avatar: { type: String },
        name: { type: String },
        username: { type: String, required: true, unique: true },
        email: { type: String, unique: true },
        password: { type: String, required: true },
        address: { type: String },
        phone: { type: String },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
).plugin(findOrCreate));

module.exports = User;




