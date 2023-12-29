const User = require('../model/user')
const router = require("express").Router();

// //CREATE
// router.post("/user/add", async (req, res) => {
//     const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
//     if (!userInfo || !userInfo.isAdmin) return res.status(400).json("Bad request!");
//     const newProduct = new User(req.body);
//     try {
//         const savedProduct = await newProduct.save();
//         res.status(200).json(savedProduct);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

//UPDATE
router.put("/update/:id", async (req, res) => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
    if (!userInfo || !userInfo.isAdmin) return res.status(400).json("Bad request!");
    try {
        const updatedProduct = await User.findOneAndUpdate({id: req.body.id}, {
            $set: req.body,
        }, {new: true});
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/delete/:id", async (req, res) => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
    if (!userInfo || !userInfo.isAdmin) return res.status(400).json("Bad request!");
    try {
        await User.findOneAndDelete({id: req.body.id});
        res.status(200).json("User has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

//FIND USER INFORMATION
router.get("/find/:id", async (req, res) => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
    if (!userInfo) return res.status(400).json("Bad request!");
    if (userInfo.isAdmin === false)
    {
        try {
            const profile = await User.findOne({id: userInfo.id});
            return res.status(200).json(profile);
        } catch (e) {
            return res.status(e.code).json(e.message)
        }
    }

});

//FIND ALL USERS (OR WITH FILTER)
router.get("/", async (req, res) => {
    const qNew = req.body.new;
    const filter = req.body.filter;
    try {
        let users;
        if (qNew) {
            users = await User.find().sort({date: -1}).limit(4);
        } else if (filter) {
            users = await User.find(filter).catch((err) =>
            {
                console.log(err.code)
            });
        } else {
            users = await User.find({});
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;