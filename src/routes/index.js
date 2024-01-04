const axios = require('axios');
const express = require('express');
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


router.get('/shop-nam', async function (req, res, next) {
    let giayNam = await axios.get('http://localhost:3000/product/', {
        params: {
            "filter": {
                "categories": {$in: ["Nam"]},
            }
        }
    })
    res.render('pages/user/shop', {title: 'Giày dép nam', Products: giayNam.data, Nam: true});
    console.log(giayNam.data.length)
});

router.get('/shop-nu', async function (req, res, next) {
    let giayNu = await axios.get('http://localhost:3000/product/', {
        params: {
            "filter": {
                "categories": {$in: ["Nữ"]},
            }
        }
    })
    res.render('pages/user/shop', {title: 'Giày dép nữ', Products:giayNu.data});
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

// ADMIN router

// router.get('/admin/', async function (req, res, next) {
//     res.render('admin/admin', { title: 'Thông tin liên hệ', layout: 'admin.hbs' });
// });

// router.get('/admin/app-chat', async function (req, res, next) {
//     res.render('admin/app_chat', { title: 'Thông tin liên hệ', layout: 'admin.hbs' });
// });

// router.get('/admin/app-calendar', async function (req, res, next) {
//     res.render('admin/app_calendar', { title: 'Thông tin liên hệ', layout: 'admin.hbs' });
// });

// router.get('/admin/ticket-list', async function (req, res, next) {
//     res.render('admin/ticket_list', { title: 'Thông tin liên hệ', layout: 'admin.hbs' });
// });

// router.get('/admin/about-us', async function (req, res, next) {
//     res.render('admin/about_us', { title: 'Thông tin liên hệ', layout: 'admin.hbs' });
// });

// POST methods


module.exports = router;
