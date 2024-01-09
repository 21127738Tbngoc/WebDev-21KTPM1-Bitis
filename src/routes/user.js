const axios = require('axios');
const express = require('express');
const router = express.Router();

//ADMIN router
router.get('/add-product', async function (req, res, next) {
    // if (!req.user || (req.user && !req.user.isAdmin))
    // {
    //     return res.status(400).json('Bad Request')
    // }
    res.render('pages/admin/add_product.hbs', {title: 'Quản lí sản phẩm', layout: 'admin.hbs'});
});

router.get('/all-orders', async function (req, res, next) {
    // if (!req.user || (req.user && !req.user.isAdmin))
    // {
    //     return res.status(400).json('Bad Request')
    // }
    let allOrders = await axios.get(`http://localhost:3000/order/`, {
        params:
            {
                user_id: req.user.id
            }
    }).then(res => res.data)
    res.render('pages/admin/order.hbs', {title: 'Quản lí đơn hàng', layout: 'admin.hbs', ordersData: allOrders});
});

router.get('/profile', async function (req, res, next) {
    // if (!req.user || (req.user && !req.user.isAdmin))
    // {
    //     return res.status(401).json('Bad Request')
    // }
    res.render('pages/admin/my_profile.hbs', {title: 'Quản lí sản phẩm', layout: 'admin.hbs', productsData: req.user,});
});

router.get('/all-users', async function (req, res, next) {
    // if (!req.user || (req.user && !req.user.isAdmin))
    // {
    //     return res.status(400).json('Bad Request')
    // }
    let Data = await axios.get('http://localhost:3000/user/').then(res => res.data)
    res.render('pages/admin/user.hbs', {title: 'Quản lí người dùng', layout: 'admin.hbs', userData: Data});
});


module.exports = router;