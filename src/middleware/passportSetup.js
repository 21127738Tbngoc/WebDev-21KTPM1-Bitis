const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oidc');
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../model/user")

passport.initialize()

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
//
// // Configure Google Strategy
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/secret",
//     scope: ['profile', 'email']
// },
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
//
// // //Configure FacebookStrategy
// // passport.use(new FacebookStrategy({
// //     clientID: process.env.FB_APP_ID,
// //     clientSecret: process.env.FB_APP_SECRET,
// //     callbackURL: "http://localhost:3000/auth/facebook/secret"
// // },
// //     function verify(accessToken, refreshToken, profile, cb) {
// //         const userProfile = {
// //             facebookId: profile.id,
// //             username: profile.emails[0],
// //             name: profile.displayName,
// //             email: profile.emails[0],
// //             avatar: profile.photos[0]
// //         }
// //         User.findOrCreate(userProfile, function (err, user) {
// //             return cb(err, user);
// //         });
// //     }
// // ));
//
module.exports = passport;