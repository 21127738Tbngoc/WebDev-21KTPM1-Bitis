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
            }
        }
    );
