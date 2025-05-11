import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Email configuration
const EMAIL_USER = process.env.EMAIL_USER || 'quizingsphere@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS || 'iqok ayxq wexw yuhp';

// File upload endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: EMAIL_USER,
      subject: 'New File Upload Notification',
      text: `A new file has been uploaded:
Filename: ${req.file.originalname}
Stored as: ${req.file.filename}
Size: ${req.file.size} bytes
Uploaded at: ${new Date().toLocaleString()}`,
      attachments: [
        {
          filename: req.file.originalname,
          path: req.file.path
        }
      ]
    };

    await transporter.sendMail(mailOptions);

    res.json({
      message: 'File uploaded successfully and email notification sent',
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      message: error.message || 'Error uploading file or sending notification'
    });
  }
});

// Existing email endpoint
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
  const distPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server started on ${HOST}:${PORT}`);
});