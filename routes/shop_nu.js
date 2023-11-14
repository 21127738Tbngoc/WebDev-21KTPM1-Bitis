var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/shop-nu', function(req, res, next) {
  res.render('user/shop_nu', {layout: 'layout.hbs'});
});

module.exports = router;
