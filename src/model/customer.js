const mongoose = require('mongoose');
const PassportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const CustomerSchema = new mongoose.Schema(
    {
        avatar: { type: String },
        name: { type: String },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        address: { type: String },
        phone: { type: String },
        orders: [
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
        isAdmin: {
            type: Boolean,
            default: false,
        },

    },
    { timestamps: true }
)
CustomerSchema.plugin(PassportLocalMongoose);
CustomerSchema.plugin(findOrCreate);

module.exports = mongoose.model("Customer", CustomerSchema);