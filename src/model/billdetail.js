const mongoose = require('mongoose');

const BillDetail = new mongoose.Schema(
    {
        order_id: Number,
        bill_date: Date,
        customer_id: Number,
        detail: [mongoose.Schema.Types.Mixed],
    }
);

module.exports = mongoose.model('BillDetail', BillDetail);