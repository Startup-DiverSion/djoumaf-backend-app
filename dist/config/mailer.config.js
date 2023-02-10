"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailConfiguration = void 0;
const nodemailer = require("nodemailer");
// Confiquration to connection
const transporter = nodemailer.createTransport({
    pool: true,
    port: 465,
    host: 'mail.djoumaf.com',
    auth: {
        user: 'no-reply@djoumaf.com',
        pass: 'djoumaf-mail-20',
    },
    secure: true,
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    },
});
// host: "smtp.mailtrap.io",
// port: 2525,
// auth: {
//   user: "ee61912deb58d4",
//   pass: "7e8fb7df4629a0"
// },
const mailConfiguration = (receivers, subject, template) => {
    const mailData = {
        from: 'no-reply@djoumaf.com',
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
