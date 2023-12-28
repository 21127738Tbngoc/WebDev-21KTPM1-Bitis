// //Require express router, passport, passport-google-oauth20, passport-facebook
// const router = require("express").Router();
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
// const CryptoJS = require('cryptojs');
// const dotenv = require('dotenv');
//
// //Require User Model
// const User = require("../model/user");
//
//
// //Use passport-local configuration Create passport local Strategy
// passport.use(User.createStrategy());
//
// //Serialize and deserialize are only necessary when using session
// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });
//
// passport.deserializeUser(function(id, done) {
//     User.findById(id, function (err, user) {
//         done(err, user);
//     });
// });
//
// //Local route Login user
// router.post("/auth/login", (req, res)=>{
//     //create new user
//     const user = new User({
//         username: req.body.username,
//         password: CryptoJS.AES.encrypt(req.body.password,process.env.SERET_KEY).toString()
//     });
//     //use passport login method to check if user credentials true and  authenticate it
//     req.login(user, (err)=>{
//         if(err){
//             console.log(err);
//         }else{
//             passport.authenticate("local")(req, res, ()=>{
//                 sessionStorage.setItem("LoggedIn","true");
//                 res.redirect("/")
//             });
//         }
//     });
// });
//
// //Local route Register new user
// router.post("/auth/register", async (req, res)=>{
//     try{
//         //Register User
//         const registerUser = await User.register({username: req.body.username}, CryptoJS.AES.encrypt(req.body.password,process.env.SERET_KEY).toString());
//         if(registerUser){
//             // if user registered, we will authenticate the user using passport
//             passport.authenticate("local")(req,res,function(){
//                 sessionStorage.setItem("LoggedIn","true");
//                 sessionStorage.setItem("userInfo",JSON.stringify(registerUser))
//                 res.redirect("/");
//             });
//         }else{
//             res.redirect("/register");
//         }
//     }catch(err){
//         console.log(err)
//         res.send("Error: " + err.message);
//     }
// });
//
// //Logout user
// router.get("/auth/logout", (req, res)=>{
//     //use passport logout method to end user session and un-authenticate it
//     req.logout();
//     sessionStorage.clear();
//     res.redirect("/");
// });
//
//
// // //Configure Google Strategy
// // passport.use(new GoogleStrategy({
// //         clientID: process.env.GOOGLE_CLIENT_ID,
// //         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// //         callbackURL: "http://localhost:3000/auth/google/secret"
// //     },
// //     function(accessToken, refreshToken, profile, cb) {
// //         // console.log(profile)
// //         User.findOrCreate({ googleId: profile.id }, function (err, user) {
// //             return cb(err, user);
// //         });
// //     }
// // ));
// //
// // //Configure FacebookStrategy
// // passport.use(new FacebookStrategy({
// //         clientID: process.env.FB_APP_ID,
// //         clientSecret: process.env.FB_APP_SECRET,
// //         callbackURL: "http://localhost:5500/auth/facebook/secret"
// //     },
// //     function(accessToken, refreshToken, profile, cb) {
// //         // console.log(profile)
// //         User.findOrCreate({ facebookId: profile.id }, function (err, user) {
// //             return cb(err, user);
// //         });
// //     }
// // ));
// //
// //
// // //Google auth route
// // router.get("/auth/google",
// //     passport.authenticate("google", {scope: ["profile"]})
// // );
// // router.get("/auth/google/secret",
// //     passport.authenticate("google", { failureRedirect: "/login" }),
// //     function(req, res) {
// //         // Successful authentication, redirect secrets page.
// //         res.redirect("/secrets");
// //     });
// //
// // //Facebook auth route
// // router.get("/auth/facebook",
// //     passport.authenticate("facebook")
// // );
// // router.get("/auth/facebook/secret",
// //     passport.authenticate("facebook", { failureRedirect: "/login" }),
// //     function(req, res) {
// //         // Successful authentication, redirect secrets page.
// //         res.redirect("/secrets");
// //     });
// //
//
// //Export router
// module.exports = router;