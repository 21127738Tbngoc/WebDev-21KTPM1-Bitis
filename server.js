'use strict';

var express = require('express'),
    handlebars  = require('express-handlebars'); // "express-handlebars"

var app = express();

var router = require('./src');

app.use('/',router);

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('public/user_home');
});

app.listen(3000, function () {
    console.log(' server listening on: 3000');
});