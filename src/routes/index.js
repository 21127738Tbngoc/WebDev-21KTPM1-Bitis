const express = require('express');
const router = express.Router();

/* GET home page. USER router*/

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Biti\'s', layout: 'main.hbs'});
});

router.get('/shop-nam', function (req, res, next) {
    res.render('user/shop_nam', {title: 'Giày dép nam', layout: 'main.hbs'});
});

router.get('/shop-nu', function (req, res, next) {
    res.render('user/shop_nu', {title: 'Giày dép nữ', layout: 'main.hbs'});
});

router.get('/contact', function (req, res, next) {
    res.render('user/contact', {title: 'Thông tin liên hệ', layout: 'main.hbs'});
});

router.get('/about-us', function (req, res, next) {
    res.render('user/about_us', {title: 'Thông tin liên hệ', layout: 'main.hbs'});
});

// ADMIN router

router.get('/admin/', function (req, res, next) {
    res.render('admin/admin', {title: 'Thông tin liên hệ', layout: 'admin_layout.hbs'});
});

router.get('/admin/app-chat', function (req, res, next) {
    res.render('admin/app_chat', {title: 'Thông tin liên hệ', layout: 'admin_layout.hbs'});
});

router.get('/admin/app-calendar', function (req, res, next) {
    res.render('admin/app_calendar', {title: 'Thông tin liên hệ', layout: 'admin_layout.hbs'});
});

router.get('/admin/ticket-list', function (req, res, next) {
    res.render('admin/ticket_list', {title: 'Thông tin liên hệ', layout: 'admin_layout.hbs'});
});

router.get('/admin/about-us', function (req, res, next) {
    res.render('admin/about_us', {title: 'Thông tin liên hệ', layout: 'admin_layout.hbs'});
});

// POST methods


module.exports = router;
