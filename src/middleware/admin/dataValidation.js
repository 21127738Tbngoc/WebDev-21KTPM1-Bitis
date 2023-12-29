const UserValidate = async (newUser) => {
    const User = require("../model/user")
    if (!newUser.username || newUser.username === "") return {code: -1, message: "Username is undefined"};
    if (!newUser.password || newUser.password === "") return {code: -2, message: "Password is undefined"};
    if (User.findOne({username: newUser.username})) return {code: -3, message: "Account exists"};
    if (User.findOne({email: newUser.email})) return {code: -1, message: "Email exists"}
    return {code: 200, message: "OK"}
}

const ProductValidate = async (newProduct) => {
    const Product = require("../model/product");
    if (!newProduct.id || newProduct.id === "") return {code: -1, message: "Product ID is invalid"};
    if (Product.findOne({id: newProduct.id})) return {code: -2, message: "Product ID exists"}
    if (!newProduct.name || Product.findOne({name: newProduct.name})) return {
        code: -3,
        message: "Invalid product's name"
    }
    if (!newProduct.description) return {message: "Description is empty"}
    if (!newProduct.price) return {message: "Invalid price"};
    if (!newProduct.images || newProduct.images.length === 0) return {message: "No image was found"}
    return {message: "OK"}
}

const FeedbackValidate = async (newFeedback) => {
    const User = require("../model/user")
    const Feedback = require("../model/feedback");
    const Product = require("../model/product");

    if (!newFeedback.id || Feedback.findOne({id: newFeedback.id})) return {message: "Invalid id!"};
    if (!newFeedback.user_id || !User.findOne({id: newFeedback.user_id})) return {message: "Invalid user!"};
    if (!newFeedback.product_id || !Product.findOne({id: newFeedback.user_id})) return {message: "Invalid product!"};

    return {message: "OK"}
}

const BillValidate = (newBill) => {
    const User = require("../model/user");
    const Product = require("../model/product");
    const BillDetail = require("../model/billdetail");

    if (!newBill.id || BillDetail.findOne({id: newBill.id})) return {message: "Invalid ID"};

    if (!newBill.user_id || !User.findOne({id: newBill.user_id})) return {message: "Invalid user!"};

    return {message: "OK"};
}

module.exports = {BillValidate, UserValidate, FeedbackValidate, ProductValidate};