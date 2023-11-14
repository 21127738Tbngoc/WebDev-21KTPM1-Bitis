var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/shop-nam', function(req, res, next) {
  res.render('user/shop_nam', {layout: 'layout.hbs'});
});

module.exports = router;
