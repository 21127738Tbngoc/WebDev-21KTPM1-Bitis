const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const {mongoose} = require("mongoose");
const dotenv = require("dotenv")
const hbs = require("./handlebarsConfig");
const cors = require("cors");

const MainRouter = require('./routes/index.js');
const AuthRouter = require("./routes/api/auth.js");
const ProductRouter = require("./routes/api/product.js");
const UserRouter = require("./routes/api/user.js");
const OrderRouter = require('./routes/api/order.js');
const FeedbackRouter = require('./routes/api/feedbacks.js');
const AdminRouter = require('./routes/admin.js');
const HbsRouter = require("./routes/api/hbs_compiler.js");

const MongoStore = require("connect-mongo");

dotenv.config();

mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("DB Connection Successfully!"))
    .catch((err) => {
        console.log(err);
    });

app.engine('.hbs',hbs)
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'KN072738',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_URI, collectionName: "sessions" }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

require("./middleware/passportSetup")

// Router implementations
app.use('/', MainRouter);
app.use('/auth/', AuthRouter);
app.use('/product/', ProductRouter);
app.use('/user/',UserRouter);
app.use('/feedback/',FeedbackRouter)
app.use('/admin/', AdminRouter);
app.use('/order/', OrderRouter);
app.use('/hbs/',HbsRouter);

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
    res.status(err.status || 500).render('pages/error', {layout: 'error.hbs', error:err, status:err.status||500});
});

module.exports = app;