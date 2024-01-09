const passport = require("passport");
const {compareSync} = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
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

//Use passport-local configuration Create passport local Strategy
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); } //When some error occurs

            if (!user) {  //When username is invalid
                return done(null, false, { message: 'Incorrect username.' });
            }

            if (!compareSync(password, user.password)) { //When password is invalid
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user); //When user is valid
        });
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

// //Configure FacebookStrategy
// passport.use(new FacebookStrategy({
//     clientID: process.env.FB_APP_ID,
//     clientSecret: process.env.FB_APP_SECRET,
//     callbackURL: "http://localhost:3000/auth/facebook/secret"
// },
//     function verify(accessToken, refreshToken, profile, cb) {
//         const userProfile = {
//             facebookId: profile.id,
//             username: profile.emails[0],
//             name: profile.displayName,
//             email: profile.emails[0],
//             avatar: profile.photos[0]
//         }
//         User.findOrCreate(userProfile, function (err, user) {
//             return cb(err, user);
//         });
//     }
// ));


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
