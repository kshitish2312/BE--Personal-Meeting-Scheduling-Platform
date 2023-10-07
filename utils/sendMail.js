const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// These id's and secrets should come from .env file.
// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URI = process.env.REDIRECT_URI;
// const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
// const SOURCE_EMAIL = process.env.SOURCE_EMAIL;

const CLIENT_ID =
  '731653363711-ndvge137g0hgif7bbrrcmhfjpcgu58u8.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN =
  '1//04eoRAI9-sOwmCgYIARAAGAQSNwF-L9Ir42zdxglFklCS-pgOGV54_TOMHdJxjiib6NGHqeJiwxeQfO3uacD6BKcGNGEALisYpmI';
const SOURCE_EMAIL = 'deepgateway65@gmail.com';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMailToVerify(
  dest_email,
  isRegisterOrLoginProcess,
  otpToVerify
) {
  console.log(dest_email, otpToVerify, 'dest_email');
  try {
    console.log('hiii');
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: SOURCE_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    console.log(dest_email, 'hii here');

    const mailOptions = {
      from: SOURCE_EMAIL,
      to: dest_email,
      subject: 'Hello from gmail using API',
      text: `Hello, Your OTP is ${otpToVerify} `,
      html: `Hello, Your OTP is ${otpToVerify} `,
    };

    console.log(dest_email, 'hii here 22');

    const result = await transport.sendMail(mailOptions);
    console.log(result, 'result');
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

sendMailToVerify()
  .then((result) => console.log('Email sent...', result))
  .catch((error) => console.log(error.message));

module.exports = sendMailToVerify;
