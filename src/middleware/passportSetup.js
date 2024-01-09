const passport = require("passport");
const {compareSync} = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../model/user")
var _ = require('lodash');
var nodemailer = require('nodemailer');


// Configure nodemailer for sending emails
var transporter = nodemailer.createTransport({
    // configure your email service
    service: "gmail",
    auth: {
        user: "nhkhanh21@clc.fitus.edu.vn",
        pass: "076942542",
    },
});

passport.initialize();

//Persists user data inside session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

//Fetches session details using session id
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


//Use passport-local configuration Create passport local Strategy
passport.use(new LocalStrategy(
    async function(username,password, done) {
        try {
            let user = await User.findOne({ username: username });

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


// Configure Google Strategy
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


