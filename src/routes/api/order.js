const Order = require('../../model/order')
const router = require("express").Router();

router.get('/', async (req, res)=> {
    const qFilter = req.query.filter || {};
    const qSort = req.query.sort || {date: -1};
    const qLimit = req.query.limit || 2**32;
    try {
        // Truy van theo yeu cau
        let orders = await Order.find(qFilter).sort(qSort).limit(qLimit);
        res.status(200).json(orders);
    } catch
        (err) {
        res.status(500).json(err.message);
    }
})

module.exports = router;

