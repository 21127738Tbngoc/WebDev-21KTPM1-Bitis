//Require express router, passport, passport-google-oauth20, passport-facebook
const router = require("express").Router();
const express = require('express');
const mailer = require('../../middleware/mailer');
const CryptoJS = require('crypto-js');
const dotenv = require('dotenv');
const passport = require("passport");
const User = require("../../model/user")

dotenv.config();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail', // Sử dụng dịch vụ Gmail (có thể sử dụng các cài đặt khác, ví dụ: host, port, auth, etc.)
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.EMAIL_PASS
    }
});


router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({username: req.body.username});

        !user && res.status(401).json("wrong credentials")
        const hashedPassword=CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const realpassword=hashedPassword.toString(CryptoJS.enc.Utf8);
        realpassword !== req.body.password && res.status(401).json("wrong credentials")

        const accessToken=jwt.sign({
                id:user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            {expiresIn:"3d"}
        )


        const{password, ...others}=user._doc;

        res.status(200).json({...others, accessToken})
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.post("/register", async (req, res) => {

    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_SEC
            ).toString(),
        });

        let savedUser;

        try {
            savedUser = await newUser.save();
        } catch (e) {
            console.log(err)
        }

        let activeToken = savedUser._id.toString('hex');
        var link = 'http://locolhost:3000/account/active/' + activeToken;

        let mailOptions = {
            from: process.env.ADMIN_EMAIL, // Địa chỉ email người gửi
            to: req.body.email, // Địa chỉ email người nhận
            subject: 'EMAIL KÍCH HOẠT TÀI KHOẢN TỪ WEB_DEV_072_038', // Chủ đề email
            html: 'Please click <a href="' + link + '"> here </a> to activate your account.'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error('Gửi email không thành công: ' + error);
            } else {
                console.log('Email đã được gửi: ' + info.response);
            }
        });

        res.status(201).json({_id: savedUser._id, username: savedUser.username});
    } catch (err) {
        res.status(500).json(err);
    }
});

//Local route Register new user
// router.post('/register', function (req, res, next) {
//     User.register(new User({username: req.body.username}),
//         req.body.password,
//         function (err, user) {
//
//             // Generate 20 bit activation code, ‘crypto’ is nodejs built in package.
//             crypto.randomBytes(20, function (err, buf) {
//
//                 // Ensure the activation code is unique.
//                 user.activeToken = user._id.toString('hex');
//
//                 // Set expiration time is 24 hours.
//                 user.activeExpires = Date.now() + 24 * 3600 * 1000;
//                 var link = 'http://locolhost:3000/account/active/'
//                     + user.activeToken;
//
//                 // Sending activation email
//                 mailer.send({
//                     to: req.body.email,
//                     subject: 'Welcome to Biti\'s',
//                     html: 'Please click <a href="' + link + '"> here </a> to activate your account.'
//                 });
//
//                 // save user object
//                 user.save(function (err, user) {
//                     if (err) return next(err);
//                     res.send('The activation email has been sent to' + user.username + ', please click the activation link within 24 hours.');
//                 });
//             });
//         });
// });

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
        user.status = "Activated"
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
    passport.authenticate('google', {failureRedirect: "/login"}),
    function (req, res) {
        // Successful authentication, redirect secrets page.
        localStorage.setItem("userInfo", JSON.stringify(req.body))
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