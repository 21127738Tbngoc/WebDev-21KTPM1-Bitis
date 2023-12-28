const Product = require('../model/product.js')
const router = require("express").Router();

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
        const product = await Product.findOne({id: req.body.id});
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const qNew = req.body.new;
    const qCategory = req.body.categories;
    try {
        let products;
        if (qNew) {
            products = await Product.find().sort({date: -1}).limit(4);
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            }).catch((err) => {
                console.log(err.code)
            });
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch
        (err) {
        res.status(500).json(err);
    }

})
;

module.exports = router;