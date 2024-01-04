//Require express router, passport, passport-google-oauth20, passport-facebook
const router = require("express").Router();
var express = require('express');
const CryptoJS = require('cryptojs');
const dotenv = require('dotenv');
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oidc');
const FacebookStrategy = require("passport-facebook").Strategy;
var mailer = require('../../middleware/mailer');
var crypto = require('crypto');
//Require User Model
const User = require("../../model/user")

dotenv.config();

//Use passport-local configuration Create passport local Strategy
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {

            if (err) { return done(err, false); }

            if (!user) { return done(null, false, { message: 'Incorrect username.' }); }

            if (user.password !== bcrypt.AES.encrypt(password).toString()) { return done(null, false, { message: 'Incorrect password.' }); }

            return done(null, user);
        });
    }
));

// // Configure Google Strategy
// passport.use(new GoogleStrategy({
//         clientID: process.env['GOOGLE_CLIENT_ID'],
//         clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
//         callbackURL: '/oauth2/redirect/google',
//         scope: ['profile']
//     },
//     function verify(accessToken, refreshToken, profile, done) {
//         User.findOrCreate({
//             username: profile.emails[0],
//             GoogleId: profile.id,
//             name: profile.displayName,
//             email: profile.emails[0],
//             avatar: profile.photos[0]
//         }, function (err, user) {
//             return done(err, user);
//         });
//     }
// ));

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

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username, name: user.name });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

//Local route Login user
router.post("/login", (req, res) => {
    //create new user
    const user = new User({
        username: req.body.username,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SERET_KEY).toString()
    });
    //use passport login method to check if user credentials true and  authenticate it
    req.login(user, (err) => {
        if (err) {
            console.log(err);
        }

        else {
            passport.authenticate("local")(req, res, () => {
                sessionStorage.setItem("userInfo", JSON.stringify(user));
                res.redirect("/")
            });
        }
    });
});

//Local route Register new user
router.post('/register', function (req, res, next) {
    User.register(new User({ username: req.body.username }),
        req.body.password,
        function (err, user) {

            // Generate 20 bit activation code, ‘crypto’ is nodejs built in package.
            crypto.randomBytes(20, function (err, buf) {

                // Ensure the activation code is unique.
                user.activeToken = user._id.toString('hex');

                // Set expiration time is 24 hours.
                user.activeExpires = Date.now() + 24 * 3600 * 1000;
                var link = 'http://locolhost:3000/account/active/'
                    + user.activeToken;

                // Sending activation email
                mailer.send({
                    to: req.body.email,
                    subject: 'Welcome to Biti\'s',
                    html: 'Please click <a href="' + link + '"> here </a> to activate your account.'
                });

                // save user object
                user.save(function (err, user) {
                    if (err) return next(err);
                    res.send('The activation email has been sent to' + user.username + ', please click the activation link within 24 hours.');
                });
            });
        });
});

router.get('/active/:activeToken', function (req, res, next) {

    // find the corresponding user
    User.findOne({
        activeToken: req.params.activeToken,
        
        // check if the expire time > the current time activeExpires: {$gt: Date.now()}
    }, function (err, user) {
        if (err) return next(err);
        
        // invalid activation code
        if (!user) {
            return res.render('message', {
                title: 'fail to activate',
                content: 'Your activation link is invalid, please <a href="/account/signup">register</a> again'
            });
        }

        // activate and save
        user.active = true;
        user.save(function (err, user) {
            if (err) return next(err);

            // activation success
            res.render('message', {
                title: 'activation success!',
                content: user.username + 'Please <a href="/account/login">login</a>'
            })
        });
    });
});



//Logout user
router.get("/logout", (req, res) => {
    //use passport logout method to end user session and un-authenticate it
    req.logout();
    sessionStorage.clear();
    res.redirect("/");
});

//Google auth route

router.get('/login/federated/google', passport.authenticate('google'));

router.get('/oauth2/redirect/google', passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
}));

// router.get("/google/secret",
//     passport.authenticate('google', { failureRedirect: "/login" }),
//     function (req, res) {
//         // Successful authentication, redirect secrets page.
//         sessionStorage.setItem("userInfo",JSON.stringify(req.body))
//         res.status(200).json(sessionStorage.getItem("userInfo"));
//         res.redirect("/");
//     });

// //Facebook auth route
// router.get("/auth/facebook",
//     passport.authenticate("facebook")
// );
// router.get("/auth/facebook/secret",
//     passport.authenticate("facebook", { failureRedirect: "/login" }),
//     function(req, res) {
//         // Successful authentication, redirect secrets page.
//         res.redirect("/secrets");
//     });



//Export router
module.exports = router;