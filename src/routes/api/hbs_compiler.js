const Handlebars = require("handlebars");
const fs = require("fs");
const router = require("express").Router();
const dotenv = require('dotenv');

Handlebars.registerHelper('currency', async function (data) {
    return data.toLocaleString('en-US', {
        style: 'currency',
        currency: 'VND'
    });
});
router.post('/partials/', async (req, res) => {
    let html;
    try {
        let source = fs.readFileSync(`./views/partials/${req.body.partial}.hbs`, "utf-8")
        Handlebars.registerPartial('product_card', source);
        let partial = Handlebars.compile(source);
        const product = req.body.data;
        try {
            html = partial({product: product});
        } catch (e) {
            console.log(e)
        }
        res.status(200).send(html)
    } catch (err) {
        res.status(500).json(err.message)
    }
})

module.exports = router