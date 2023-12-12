const express = require('express');
const router = express.Router();

/* GET home page. USER router*/

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Biti\'s', layout: 'user_layout.hbs' });
});

router.get('/shop-nam', function (req, res, next) {

    res.render('user/shop_nam', { title: 'Giày dép nam', layout: 'user_layout.hbs' });

});

router.get('/shop-nu', function (req, res, next) {
    res.render('user/shop_nu', { title: 'Giày dép nữ', layout: 'user_layout.hbs' });
});

router.get('/contact', function (req, res, next) {
    res.render('user/contact', { title: 'Thông tin liên hệ', layout: 'user_layout.hbs' });
});

router.get('/about-us', function (req, res, next) {
    res.render('user/about_us', { title: 'Thông tin liên hệ', layout: 'user_layout.hbs' });
});

router.post("/register", function (req, res) {
    User.register(new User({ email: req.body.email, username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            res.json({ success: false, message: "Your account could not be saved. Error: " + err });
        }
        else {
            req.login(user, (er) => {
                if (er) {
                    res.json({ success: false, message: er });
                }
                else {
                    res.json({ success: true, message: "Your account has been saved" });
                }
            });
        }
    });
});

router.post("/login", function (req, res) {
    if (!req.body.username) {
        res.json({ success: false, message: "Username was not given" })
    }
    else if (!req.body.password) {
        res.json({ success: false, message: "Password was not given" })
    }
    else {
        passport.authenticate("local", function (err, user, info) {
            if (err) {
                res.json({ success: false, message: err });
            }
            else {
                if (!user) {
                    res.json({ success: false, message: "username or password incorrect" });
                }
                else {
                    const token = jwt.sign({ userId: user._id, username: user.username }, secretkey, { expiresIn: "24h" });
                    res.json({ success: true, message: "Authentication successful", token: token });
                }
            }
        })(req, res);
    }
});


// ADMIN router

router.get('/admin/', function (req, res, next) {
    res.render('admin/admin', { title: 'Thông tin liên hệ', layout: 'admin_layout.hbs' });
});

router.get('/admin/app-chat', function (req, res, next) {
    res.render('admin/app_chat', { title: 'Thông tin liên hệ', layout: 'admin_layout.hbs' });
});

router.get('/admin/app-calendar', function (req, res, next) {
    res.render('admin/app_calendar', { title: 'Thông tin liên hệ', layout: 'admin_layout.hbs' });
});

router.get('/admin/ticket-list', function (req, res, next) {
    res.render('admin/ticket_list', { title: 'Thông tin liên hệ', layout: 'admin_layout.hbs' });
});

router.get('/admin/about-us', function (req, res, next) {
    res.render('admin/about_us', { title: 'Thông tin liên hệ', layout: 'admin_layout.hbs' });
});

module.exports = router;
