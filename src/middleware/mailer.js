var _ = require('lodash');	
var nodemailer = require('nodemailer');

var config = {
    host: 'smtp.126.com',
    port: 25,
    auth: {
        user: 'nhkhanh21@clc.fitus.edu.vn',
        pass: '076942542'
    }
};
    
var transporter = nodemailer.createTransport(config);

var defaultMail = {
    from: "Nguyễn Hữu Khánh <nhkhanh21@clc.fitus.edu.vn>",
    text: "test text",
};

module.exports = function(mail){
    // use default setting
    mail = _.merge({}, defaultMail, mail);
    
    // send email
    transporter.sendMail(mail, function(error, info){
        if(error) return console.log(error);
        console.log('mail sent:', info.response);
    });
};