var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Biti\'s', layout: 'user_layout.hbs' });
});

router.get('/shop-nam', function (req, res, next) {
  res.render('user/shop_nam', { title: 'Giày dép nam', layout: 'user_layout.hbs' });
});

router.get('/shop-nu', function (req, res, next) {
  res.render('user/shop_nu', { title: 'Giày dép nữ', layout: 'user_layout.hbs' });
});

router.get('/contact', function (req, res, next) {
  res.render('user/contact', { title: 'Thông tin liên hệ', layout: 'user_layout.hbs' });
});

module.exports = router;
