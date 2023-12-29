//Require express router, passport, passport-google-oauth20, passport-facebook
const router = require("express").Router();
const CryptoJS = require('cryptojs');
const dotenv = require('dotenv');
const passport = require('../middleware/passportSetup')

//Require User Model
const User = require("../model/user");

dotenv.config();

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
router.post("/register", async (req, res) => {
    try {
        //Register User
        const registerUser = await User.register({ username: req.body.username }, CryptoJS.AES.encrypt(req.body.password, process.env.SERET_KEY).toString());
        if (registerUser) {
            // if user registered, we will authenticate the user using passport
            passport.authenticate("local")(req, res, function () {
                sessionStorage.setItem("userInfo", JSON.stringify(registerUser))
                res.redirect("/");
            });
        } else {
            res.redirect("/register");
        }
    } catch (err) {
        console.log(err)
        res.send("Error: " + err.message);
    }
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
    successRedirect: '/',
    failureRedirect: '/login'
  }));

router.get("/google/secret",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
        // Successful authentication, redirect secrets page.
        sessionStorage.setItem("userInfo",JSON.stringify(req.body))
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