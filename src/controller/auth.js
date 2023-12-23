// const passport = require('passport');
// const bcrypt = require('bcrypt');
// const User = require('../model/user');
// const LocalStrategy = require('passport-local');
//
// passport.serializeUser(User.serializeUser());
//
// passport.deserializeUser(
//     User.deserializeUser((username, done) => {
//         User.findOne(username, function (err, user) {
//             done(err, user);
//         })
//     }))
//
//
// module.exports = (app) => {
//     app.use(passport.initialize());
//     app.use(passport.session());
//
//     passport.use(new LocalStrategy(
//         function (username, password, done) {
//             User.findOne({ username: username }, function (err, user) {
//                 if (err) { return done(err); }
//                 if (!user) { return done(null, false); }
//                 if (!user.verifyPassword(password)) { return done(null, false); }
//                 return done(null, user);
//             });
//         }
//     ));
//
// }