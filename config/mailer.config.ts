import * as nodemailer from 'nodemailer';

// Confiquration to connection
const transporter = nodemailer.createTransport({
   pool: true,
   port: 465, // true for 465, false for other ports
   host: 'mail.djoumaf.net',
   auth: {
      user: 'no-reply@djoumaf.net',
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

export const mailConfiguration = (
   receivers: string | Array<string>,
   subject: string,
   template: string
) => {
   const mailData = {
      from: 'no-reply@djoumaf.com', // sender address
      to: receivers, // list of receivers
      subject: subject,
      html: template,
   };

   transporter.sendMail(mailData, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
   });
};
