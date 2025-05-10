import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use environment variables for email configuration
const EMAIL_USER = process.env.EMAIL_USER || 'quizingsphere@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS || 'imie ypbb felj fdix';

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

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
}); 