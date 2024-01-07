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
                    console.log(data)
                    return parseInt(data).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    });
                },

                rating: (stars) =>
                {
                    return `https://res.cloudinary.com/dxsvumas8/image/upload/v1703921412/rating-${Math.round(stars)}.png`
                },

                pStatus: (quantity) =>
                {
                    return (quantity === 0? 'Hết hàng': 'Còn hàng')
                },

                time: function timeDifference(fromDate) {
                    const now = new Date();
                    const difference = now - new Date(fromDate);
                    const seconds = Math.floor(difference / 1000);
                    const minutes = Math.floor(seconds / 60);
                    const hours = Math.floor(minutes / 60);
                    const days = Math.floor(hours / 24);
                    const months = Math.floor(days / 30);
                    const years = Math.floor(days / 365);

                    if (years > 0) {
                        return years + (years === 1 ? ' year' : ' years') + " ago";
                    } else if (months > 0) {
                        return months + (months === 1 ? ' month' : ' months') + " ago";
                    } else if (days > 0) {
                        return days + (days === 1 ? ' day' : ' days') + " ago";
                    } else if (hours > 0) {
                        return hours + (hours === 1 ? ' hour' : ' hours') + " ago" ;
                    } else if (minutes > 0) {
                        return minutes + (minutes === 1 ? ' minute' : ' minutes')  + " ago";
                    } else {
                        return seconds + (seconds === 1 ? ' second' : ' seconds')  + " ago";
                    }
                }

            }
        }
    );
