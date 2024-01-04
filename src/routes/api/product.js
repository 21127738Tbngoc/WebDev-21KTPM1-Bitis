const Product = require('../../model/product.js')
const mongoose = require("mongoose");
const router = require("express").Router();
const dotenv = require('dotenv');

dotenv.config();

//CREATE
router.post("/add", async (req, res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/update/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/delete/:id", async (req, res) => {
    try {
        await Product.findOneAndDelete({id: req.body.id});
        res.status(200).json("Product has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findOne({id: req.params.id});
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
    console.log(req.query)
    const qFilter = req.query.filter || {};
    const qSort = req.query.sort || {date: -1};
    const qLimit = req.query.limit || 2**32;

    try {
        // Truy van theo yeu cau
        let products = await Product.find(qFilter).sort(qSort).limit(qLimit);
        // Trich xuat 1 trang san pham (pagination)
        // let result = [];
        // for (let i = process.env.PAGE_SIZE * qPage; i < process.env.PAGE_SIZE * (qPage + 1); i++) {
        //     if (products[i])
        //     {
        //         result.push(products[i])
        //     }
        // }
        res.status(200).json(products);
    } catch
        (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;