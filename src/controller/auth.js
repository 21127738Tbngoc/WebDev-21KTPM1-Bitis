const passport = require('passport');
const bcrypt = require('bcrypt');
const Customer = require('../model/user');
const LocalStrategy = require('passport-local');

passport.serializeUser(Customer.serializeUser());

passport.deserializeUser(
    Customer.deserializeUser((username, done) => {
        User.findOne(username, function (err, user) {
            done(err, user);
        })
    }))

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(
        function (username, password, done) {
            Customer.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if (!user.verifyPassword(password)) { return done(null, false); }
                return done(null, user);
            });
        }
    ));

}