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
        title: 'Biti\'s', NewProducts: NewProducts, BestSellers: BestSellers,
    })
})

router.get('/detail/:id', async (req,res)=>
{
    try {
        let product = await Product.findOne({_id: req.params.id});
        let related = await Product.find({
            categories: {$all: product.categories.slice(0, product.categories.length - 1)}
        }).sort({date: -1}).limit(4)
        let feedbacks = await axios.get('http://localhost:3000/feedback/', {
            params: {
                filter: {"product_id": product.id}
            }
        }).then((res) => res.data)
        let fbUser = []
        for (let i = 0; i < feedbacks.length; i++) {
            let avartar = await axios.get(`http://localhost:3000/user/avartar/`, {
                params:
                    {id: feedbacks[i].user_id}
            })
            fbUser.push({feedback: feedbacks[i], avartar: avartar})
        }
        console.log(product)
        res.status(200).render('pages/user/product_detail', {
            title: 'Thông tin sản phẩm', Product:product, relatedProducts: related, feedbacks:fbUser, User:req.user
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
})


router.get('/shop-nam', async function (req, res, next) {
    res.render('pages/user/shop', {title: 'Giày dép nam', Nam: true});
});

router.get('/shop-nu', async function (req, res, next) {

    res.render('pages/user/shop', {title: 'Giày dép nữ', Nam: false});
});

router.get('/contact', async function (req, res, next) {
    res.render('pages/user/contact', {title: 'Thông tin liên hệ'});
});

router.get('/about-us', async function (req, res, next) {
    res.render('pages/user/about_us', {title: 'Thông tin liên hệ'});
});

router.get('/order-history', async function (req,res,next)
{
    res.render('pages/user/order_history', {title: 'Profile'})
})



module.exports = router;
