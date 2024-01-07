const axios = require('axios');
const express = require('express');
const router = express.Router();

//ADMIN router
router.get('/add-product', async function (req, res, next) {
    res.render('pages/admin/add_product.hbs', { title: 'Thông tin liên hệ', layout:'admin.hbs'});
});

router.get('/all_orders', async function (req, res, next) {
    res.render('pages/admin/all_orders.hbs', { title: 'Thông tin liên hệ', layout: 'admin.hbs' });
});

router.get('/all_products', async function (req, res, next) {
    res.render('pages/admin/all_products.hbs', { title: 'Thông tin liên hệ', layout: 'admin.hbs' });
});

router.get('/all_users', async function (req, res, next) {
    res.render('pages/admin/all_users.hbs', { title: 'Thông tin liên hệ', layout: 'admin.hbs' });
});

// router.get('/admin/about-us', async function (req, res, next) {
//     res.render('pages/about_us', { title: 'Thông tin liên hệ', layout: 'admin.hbs' });
// });

module.exports = router;