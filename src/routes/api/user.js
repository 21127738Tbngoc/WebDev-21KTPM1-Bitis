const User = require('../../model/user')
const router = require("express").Router();

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
    if (userInfo.isAdmin === false) {
        try {
            const profile = await User.findOne({id: userInfo.id});
            return res.status(200).json(profile);
        } catch (e) {
            return res.status(e.code).json(e.message)
        }
    }
});

router.get('/avatar/', async (req, res) => {
        const id = req.query.id;
        console.log(id)
        try
        {
            const user = await User.findOne({id: id})
            return res.status(200).json(`"avatar": ${user.avatar}`);
        } catch (e)
        {
            res.status(e.code).json(e.message)
        }
    }
)

//FIND ALL USERS (OR WITH FILTER)
router.get("/", async (req, res) => {
    const qFilter = req.query.filter || {};
    const qSort = req.query.sort || {name: -1};
    const qLimit = req.query.limit || 2 ** 32;
    console.log(req.query)
    try {
        let Users = await User.find(qFilter).sort(qSort).limit(qLimit);
        res.status(200).json(Users);
    } catch
        (err) {
        res.status(500).json(err.message);
    }
});

module.exports = router;