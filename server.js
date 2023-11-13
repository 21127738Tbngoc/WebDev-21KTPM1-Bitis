'use strict';

var express = require('express'),
    exphbs  = require('../../'); // "express-handlebars"

var app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('public/user_home');
});

app.listen(3000, function () {
    console.log(' server listening on: 3000');
});