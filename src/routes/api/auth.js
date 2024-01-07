//Require express router, passport, passport-google-oauth20, passport-facebook
const router = require("express").Router();
const express = require('express');
const mailer = require('../../middleware/mailer');
const crypto = require('crypto');
const dotenv = require('dotenv');
const passport = require("passport");
const User = require("../../model/user")
dotenv.config();

//Local route Login user
router.post("/login", (req, res) => {
    //create new user
    const user = new User({
        username: req.body.username,
        password: bcrypt.AES.encrypt(req.body.password, process.env.SERET_KEY).toString()
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

router.get("/google/secret",
    passport.authenticate('google', { failureRedirect: "/login" }),
    function (req, res) {
        // Successful authentication, redirect secrets page.
        localStorage.setItem("userInfo",JSON.stringify(req.body))
        res.status(200).json(sessionStorage.getItem("userInfo"));
        res.redirect("/");
    });

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