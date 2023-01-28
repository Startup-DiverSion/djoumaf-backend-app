import * as nodemailer from 'nodemailer'


// Confiquration to connection
const transporter = nodemailer.createTransport({
    pool: true,
    port: 465,               // true for 465, false for other ports
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
})

export const mailConfiguration = (receivers: string | Array<string>, subject: string, template: string ) => {

    const mailData = {
        from: '	contact@dolubux.com',  // sender address
        to: receivers,   // list of receivers
        subject: subject,
        html: template,
    };

    transporter.sendMail(mailData, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });

}