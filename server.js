const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use your Gmail and app password here
const EMAIL_USER = 'quizingsphere@gmail.com';
const EMAIL_PASS = 'imie ypbb felj fdix';

app.post('/send', async (req, res) => {
  const { fullName, email, mobileNumber, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: EMAIL_USER,
    subject: `New message from ${fullName}: ${subject}`,
    text: `Full Name: ${fullName}\nEmail: ${email}\nMobile: ${mobileNumber}\nSubject: ${subject}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('Message sent successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
}); 