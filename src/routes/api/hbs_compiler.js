// const Handlebars = require("handlebars");
// const fs = require("fs");
// const dotenv = require('dotenv');
// const Product = require("../../model/product");
// const handlebars = require("handlebars");
// const router = require("express").Router();
//
// var partials = {};
//
// // Đăng ký các helper
// Handlebars.registerHelper('currency', (data) => {
//     return parseInt(data).toLocaleString('vi-VN', {
//         style: 'currency',
//         currency: 'VND'
//     });
// });
//
// Handlebars.registerHelper('rating', (stars) => {
//     return `https://res.cloudinary.com/dxsvumas8/image/upload/v1703921412/rating-${Math.round(stars)}.png`;
// });
//
// Handlebars.registerHelper('pStatus', (quantity) => {
//     return (quantity === 0 ? 'Hết hàng' : 'Còn hàng');
// });
//
// Handlebars.registerHelper('timeDifference', function (fromDate) {
//     const now = new Date();
//     const difference = now - new Date(fromDate);
//     const seconds = Math.floor(difference / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const hours = Math.floor(minutes / 60);
//     const days = Math.floor(hours / 24);
//     const months = Math.floor(days / 30);
//     const years = Math.floor(days / 365);
//
//     if (years > 0) {
//         return years + (years === 1 ? ' year' : ' years') + " ago";
//     } else if (months > 0) {
//         return months + (months === 1 ? ' month' : ' months') + " ago";
//     } else if (days > 0) {
//         return days + (days === 1 ? ' day' : ' days') + " ago";
//     } else if (hours > 0) {
//         return hours + (hours === 1 ? ' hour' : ' hours') + " ago";
//     } else if (minutes > 0) {
//         return minutes + (minutes === 1 ? ' minute' : ' minutes') + " ago";
//     } else {
//         return seconds + (seconds === 1 ? ' second' : ' seconds') + " ago";
//     }
// });
//
// fs.readdir(`./views/partials`, function (err, files) {
//     if (err) {
//         console.log('Lỗi khi đọc thư mục: ', err);
//         return;
//     }
//
//     files.forEach(function (file) {
//         const filePath = `./views/partials/${file}`;
//         let source = fs.readFileSync(filePath, 'utf8')
//         Handlebars.registerPartial(`${file.split(".")[0]}`, source);
//         partials[file.split(".")[0]] = Handlebars.compile(`{{> ${file.split(".")[0]}}}`)
//     })
// });
//
// Handlebars.registerHelper('currency', function (data) {
//     return parseInt(data).toLocaleString('vi-VN', {
//         style: 'currency',
//         currency: 'VND'
//     });
// });
//
//
// async function renderProductCard(data) {
//     let html;
//     try {
//         let source = fs.readFileSync(`./views/partials/product_card.hbs`, "utf-8")
//         Handlebars.registerPartial('product_card', source);
//         let partial = Handlebars.template(source);
//         const product = data;
//         console.log((product))
//             html = partial({product: product});
//             console.log(html)
//         return html
//     } catch (err) {
//         return err
//     }
// }
//
// module.exports = router
//
// function page(Data) {
//     let html;
//     try {
//         let source = fs.readFileSync(`./views/page/${page_name}.hbs`)
//         Handlebars.registerPartial('product_detail', source);
//         let partial = Handlebars.compile(source);
//         const product = Data;
//         try {
//             html = partial({product: product});
//         } catch (e) {
//             console.log(e)
//         }
//         return html
//     } catch (err) {
//         console.log(err)
//     }
// }
//
// router.get('/product-page', async (req, res) => {
//     const qFilter = req.query.filter || {};
//     const qSort = req.query.sort || {date: -1};
//     const qLimit = req.query.limit || 2 ** 32;
//     let products =  await Product.find(qFilter).sort(qSort).limit(qLimit);
//     let html = []
//     let  _html;
//     console.log(products)
//     for (let i = 0; i < products.length; i++) {
//
//         let source = fs.readFileSync(`./views/partials/product_card_2.hbs`, "utf-8")
//         Handlebars.registerPartial('product_card', source);
//         console.log(source)
//         let partial = Handlebars.compile(source);
//         _html = partial(products[i]);
//         html.push(_html)
//     }
//     res.status(200).send(html)
// })
//
// module.exports = router