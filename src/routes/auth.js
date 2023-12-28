const User = require("../model/user")
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const {UserValidate} = require("../middleware/dataValidation")
//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    });

    const validate = await UserValidate(newUser);
    if (validate.message !== "OK") {
        return res.status(500).json(validate.message)
    }

    try {
        const savedUser = newUser.save();
        res.status(201).json("Register successfully");
    } catch (err) {
        return res.status(err.code).json("Register failed!");
    }
})

//LOGIN
router.post("/login", async (req, res) => {
    try {
        console.log(req.body)
        const user = await User.findOne({username: req.body.username});
        if ((!user) || (user.password !== CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString())) {
            return res.status(401).json("wrong credentials");
        }
        const userInfo = {id: user.id, name: user.name, avatar: user.avatar,isAdmin: user.isAdmin}
        sessionStorage.setItem("userInfo",JSON.stringify(userInfo));
        console.log(userInfo)
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get("/logout", async (req,res) => {
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
    if (userInfo === null)
    {
        return res.status(401).json("You are not logged in");
    }
    console.log(userInfo)
    sessionStorage.clear()
})

module.exports = router;