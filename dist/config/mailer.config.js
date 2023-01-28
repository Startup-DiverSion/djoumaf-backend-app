"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailConfiguration = void 0;
var nodemailer = require("nodemailer");
// Confiquration to connection
var transporter = nodemailer.createTransport({
    pool: true,
    port: 465,
    host: "mail.infomaniak.com",
    auth: {
        user: 'contact@dolubux.com',
        pass: 'Dcontact-nray-20',
    },
    secure: true,
    // host: "smtp.mailtrap.io",
    // port: 2525,
    // auth: {
    //   user: "ee61912deb58d4",
    //   pass: "7e8fb7df4629a0"
    // },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    },
});
var mailConfiguration = function (receivers, subject, template) {
    var mailData = {
        from: '	contact@dolubux.com',
        to: receivers,
        subject: subject,
        html: template,
    };
    transporter.sendMail(mailData, function (err, info) {
        if (err)
            console.log(err);
        else
            console.log(info);
    });
};
exports.mailConfiguration = mailConfiguration;
