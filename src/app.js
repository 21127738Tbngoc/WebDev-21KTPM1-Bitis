const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
import {create} from 'express-handlebars';
const session = require("express-session");
const passport = require('passport');
const mongoose = require("mongoose");
const dotenv = require("dotenv")


const Router = require('./routes/index.js');
const AuthRouter = require('./routes/auth.js');

dotenv.config();

mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', Router);


//Setup session
app.use(session({
    resave: false,
    saveUninitialized: false
}));


//Initialize passport
app.use(passport.initialize());

//Use passport to deal with session
app.use(passport.session());

const hbs = create({
    // Uses multiple partials dirs, templates in "shared/templates/" are shared
    // with the client-side of the app (see below).
    partialsDir: [
        "views/partials/",
    ],
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;