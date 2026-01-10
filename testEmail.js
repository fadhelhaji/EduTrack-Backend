require('dotenv').config(); // loads your .env

const sendEmail = require('./utilities/sendEmail'); // path to your sendEmail file

async function test() {
    try {
        await sendEmail({
            to: 'fadhelmh@hotmail.com', // replace with any email you want to send to
            subject: 'EduTrack Test Email',
            html: '<h1>Hello from EduTrack!</h1><p>This is a test email.</p>',
        });
        console.log('✅ Email sent successfully!');
    } catch (error) {
        console.error('❌ Error sending email:', error);
    }
}

test();
