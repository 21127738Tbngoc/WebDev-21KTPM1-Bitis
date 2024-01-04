const Order = require('../../model/order')
const router = require("express").Router();

router.get('/', async (req, res)=> {
    const sort = parseInt(req.query.sort);
    const qfilter = req.query.filter;
    try {
        let orders;
        if (sort) {
            orders = await Order.find().sort({date: sort});
        } else if (qfilter) {
            orders = await Order.find(qfilter).catch((err) => {
                console.log(err.message)
            });
        } else {
            orders = await Order.find();
        }
        res.status(200).json(orders);
    } catch
        (err) {
        res.status(500).json(err.message);
    }
})

module.exports = router;

