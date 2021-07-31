require('dotenv').config();
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const oauth = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
);

oauth.setCredentials({ 
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

export const sendEmail = async ( mailOptions ) => {
    let accessToken = await oauth.getAccessToken();

    let transporter = nodemailer.createTransport({  
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.GMAIL_EMAIL,  
            clientId: process.env.GMAIL_CLIENT_ID,
            clientSecret: process.env.GMAIL_CLIENT_SECRET,
            refreshToken: process.env.GMAIL_REFRESH_TOKEN,
            accessToken,
        }
    });

    transporter.sendMail(mailOptions);
}