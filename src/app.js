const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const {mongoose} = require("mongoose");
const dotenv = require("dotenv")
const cors = require("cors");

const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("./model/user")

const MainRouter = require('./routes/index.js');
const AuthRouter = require("./routes/api/auth.js");
const ProductRouter = require("./routes/api/product.js");
const UserRouter = require("./routes/api/user.js");
const OrderRouter = require('./routes/api/order.js');
const FeedbackRouter = require('./routes/api/feedbacks.js');
const AdminRouter = require('./routes/admin.js');
const HbsRouter = require('./routes/api/hbs_compiler')

const hbs = require("./handlebarsConfig");

const MongoStore = require("connect-mongo");

dotenv.config();

mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("DB Connection Successfully!"))
    .catch((err) => {
        console.log(err);
    });

app.engine('.hbs', hbs)
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
    store: MongoStore.create({mongoUrl: process.env.DB_URI, collectionName: "sessions"}),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(passport.initialize())
app.use(passport.session());

//Persists user data inside session
//Serialize and deserialize are only necessary when using session
passport.serializeUser(function(user, done) {
    done(null, user._id);
});
passport.deserializeUser(async function(_id, done) {
    let user = await User.findById(_id);
    if (!user)
    {
        return done(null,null)
    }
    return done(null,user)
});

passport.use(new LocalStrategy(
    async function (username, password, done) {
        try {
            let Data = await User.find({username: username});
            let user = Data[0]
            if (!user) {
                return done(null, false); // Không tìm thấy người dùng
            }

            if (password !== user.password) {
                return done(null, false); // Sai mật khẩu
            }
            return done(null, user); // Xác thực thành công
        } catch (err) {
            return done(err); // Xảy ra lỗi trong quá trình tìm kiếm người dùng
        }
    }
));

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        scope: ['profile', 'email']
    },
    function (accessToken, refreshToken, profile, cb) {
        console.log(accessToken, profile);
        User.findOne({googleId: profile.id}, (err, user) => {
            if (err) return cb(err, null);
            if (!user) {
                let newUser = new User({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0],
                    avatar: profile.photos[0]
                })

                newUser.save();

                return cb(null, newUser);

            } else {
                return cb(null, user)
            }
        })
    }
));

app.post('/login',
    passport.authenticate('local', {failureRedirect: '/'}),
    function (req, res) {
        console.log("Logged in successfully")
        res.redirect('/');
    });

// Router implementations
app.use('/', MainRouter);
app.use('/auth/', AuthRouter);
app.use('/product/', ProductRouter);
app.use('/user/', UserRouter);
app.use('/feedback/', FeedbackRouter)
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
    res.status(err.status || 500).render('pages/error', {layout: 'error.hbs', error: err, status: err.status || 500});
});

module.exports = app;