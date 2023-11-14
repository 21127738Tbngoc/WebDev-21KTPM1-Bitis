var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Biti\'s' });
});

router.get('/shop-nam', function(req, res, next) {
  res.render('user/shop_nam', { title: 'Biti\'s' });
});

router.get('/shop-nu', function(req, res, next) {
  res.render('user/shop_nu', { title: 'Biti\'s' });
});

// router.get('/contact', function(req, res, next) {
//   res.render('user/contact', { title: 'Biti\'s' });
// });

module.exports = router;
