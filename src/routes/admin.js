const axios = require('axios');
const express = require('express');
const router = express.Router();

//ADMIN router
router.get('/add-product', async function (req, res, next) {
    if (!req.user || (req.user && !req.user.isAdmin))
    {
        return res.status(400).json('Bad Request')
    }
    res.render('pages/admin/add_product.hbs', { title: 'Thông tin liên hệ', layout:'admin.hbs'});
});

router.get('/all-orders', async function (req, res, next) {
    if (!req.user || (req.user && !req.user.isAdmin))
    {
        return res.status(400).json('Bad Request')
    }
    res.render('pages/admin/all_orders.hbs', { title: 'Thông tin liên hệ', layout: 'admin.hbs' });
});

router.get('/all-products', async function (req, res, next) {
    if (!req.user || (req.user && !req.user.isAdmin))
    {
        return res.status(400).json('Bad Request')
    }
    res.render('pages/admin/all_products.hbs', { title: 'Thông tin liên hệ', layout: 'admin.hbs' });
});

router.get('/all-users', async function (req, res, next) {
    if (!req.user || (req.user && !req.user.isAdmin))
    {
        return res.status(400).json('Bad Request')
    }
    res.render('pages/admin/all_users.hbs', { title: 'Thông tin liên hệ', layout: 'admin.hbs' });
});


module.exports = router;