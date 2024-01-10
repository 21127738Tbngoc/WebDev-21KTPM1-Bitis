const axios = require('axios');
const express = require('express');
const Product = require("../model/product");
const router = express.Router();

/* GET home page. USER router*/

router.get("/", async function (req, res, next) {

    let NewProducts = await axios.get('http://localhost:3000/product/', {
        params: {
            isNew: true, limit: 4,
        }
    }).then((res) => res.data)

    let BestSellers = await axios.get('http://localhost:3000/product/', {
        params: {
            filter: {}, sort: `{"quantity": "acs"}`, limit: 4,
        }
    }).then((res) => res.data)

    res.render('pages/index', {
        title: 'Biti\'s', NewProducts: NewProducts, BestSellers: BestSellers,User: req.user
    })
})

router.get('/detail/:id', async (req, res) => {
    try {
        let product = await axios.get(`http://localhost:3000/product/`, {
                    params:
                        {
                            filter: {_id: req.params.id}
                        }
                }
            ).then((res) => res.data)
        ;
        product = product[0];

        let related = await axios.get('http://localhost:3000/product/', {
            params: {
                filter: {categories: {$all: product.categories.slice(0, product.categories.length - 1)}},
                limit: 4,
            }
        }).then((res) => res.data)

        let feedbacks = await axios.get('http://localhost:3000/feedback/', {
            params: {
                filter: {"product_id": product.id}
            }
        }).then((res) => res.data)

        let fbUser = []

        for (let i = 0; i < feedbacks.length; i++) {
            let avatar = await axios.get(`http://localhost:3000/user/avartar/`, {
                params:
                    {id: feedbacks[i].user_id}
            })
            fbUser.push({feedback: feedbacks[i], avatar: avatar})
        }

        res.render('pages/user/product_detail', {
            title: 'Thông tin sản phẩm',
            Product: product,
            relatedProducts: related,
            feedbacks: fbUser,
            User: req.user
        });

    } catch
        (err) {
        res.status(500).json(err.message);
    }
})


router.get('/shop-nam', async function (req, res, next) {
    const qFilter = req.query.filter || {};
    const qSort = req.query.sort || {date: -1};
    const qLimit = req.query.limit || 2 ** 32;
    let products = await Product.find(qFilter).sort(qSort).limit(qLimit);
    res.render('pages/user/shop', {title: 'Giày dép nam', Nam: true, Products:products ,User: req.user});
});

router.get('/shop-nu', async function (req, res, next) {
    const qFilter = req.query.filter || {};
    const qSort = req.query.sort || {date: -1};
    const qLimit = req.query.limit || 2 ** 32;
    let products = await Product.find(qFilter).sort(qSort).limit(qLimit);
    res.render('pages/user/shop', {title: 'Giày dép nữ', Nam: false ,Products: products ,User: req.user});
});

router.get('/contact', async function (req, res, next) {
    res.render('pages/user/contact', {title: 'Thông tin liên hệ',User: req.user});
});

router.get('/about-us', async function (req, res, next) {
    res.render('pages/user/about_us', {title: 'Thông tin liên hệ',User: req.user});
});

router.get('/order-history', async function (req, res, next) {
    res.render('pages/user/order_history', {title: 'Profile',User: req.user})
})


module.exports = router;
