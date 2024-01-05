const hbs = require('express-handlebars');
const path = require("path");

module.exports =
    hbs.engine(
        {
            extname: '.hbs',
            defaultLayout: 'main.hbs',
            layoutsDir: path.join(__dirname, 'views/layouts'),
            partialsDir: path.join(__dirname, 'views/partials'),
            helpers: {
                currency: (data) => {
                    return data.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    });
                },
                page_amount: (props) => {
                    let pages = []
                    for (let i = 1; i < props.length / 24 + 1; i++) {
                        pages.push(i);
                    }
                    return pages;
                },

            }
        }
    );
