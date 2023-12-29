const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const {mongoose} = require("mongoose");
const dotenv= require("dotenv")
const {engine} = require("express-handlebars");
const cors = require("cors");
const MongoStore = require('connect-mongo');

const MainRouter = require('./routes/index.js');
const AuthRouter = require("./routes/__auth.js");
const ProductRouter = require("./routes/product");
const AdminRouter = require("./routes/user");

// Router implementations
app.use('/', MainRouter);
app.use('/auth/',AuthRouter);
app.use('/product/', ProductRouter);
app.use('/admin/',AdminRouter);

dotenv.config();

mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("DB Connection Successfully!"))
    .catch((err) => {
        console.log(err);
    });

app.engine('hbs', engine(
    {
        extname: '.hbs',
        defaultLayout: 'main.hbs',
        layoutsDir: path.join(__dirname,'views/layouts'),
        partialsDir: path.join(__dirname,'views/partials'),
    }
));

require("dotenv").config()

app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


//Setup session
app.use(session({
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}))


//Initialize passport
app.use(passport.initialize());

// //Use passport to deal with session
// app.use(passport.session());


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

app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port 3000!");

});

module.exports = app;