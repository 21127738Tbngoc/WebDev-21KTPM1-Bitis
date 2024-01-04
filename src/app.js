const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const {mongoose} = require("mongoose");
const dotenv = require("dotenv")
const hbs = require("express-handlebars");

const cors = require("cors");
const passport = require('passport');

const MainRouter = require('./routes/index.js');
const AuthRouter = require("./routes/api/auth.js");
const ProductRouter = require("./routes/api/product.js");
const AdminRouter = require("./routes/api/user.js");
const OrderRouter = require('./routes/api/order.js')
// Router implementations
app.use('/', MainRouter);
app.use('/auth/', AuthRouter);
app.use('/product/', ProductRouter);
app.use('/admin/', AdminRouter);
app.use('/order/', OrderRouter);

dotenv.config();

mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("DB Connection Successfully!"))
    .catch((err) => {
        console.log(err);
    });

app.engine('hbs', hbs.engine(
    {
        extname: '.hbs',
        defaultLayout: 'main.hbs',
        layoutsDir: path.join(__dirname, 'views/layouts'),
        partialsDir: path.join(__dirname, 'views/partials'),
        helpers: {
            page_amount(props) {
                let pages = []
                for (let i = 1; i < props.length / 24 + 1; i++) {
                    pages.push(i);
                }
                return pages;
            }
        }
    }
));


app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

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
    res.render('pages/error');
});

module.exports = app;