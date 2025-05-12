import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import multer from 'multer';
import fs from 'fs';
import cookieParser from 'cookie-parser';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 5000;

// Cookie parser middleware
app.use(cookieParser());

// Configure CORS for different routes
app.use(cors({
  origin: true, // This allows all origins but maintains credentials if specified
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  credentials: true
}));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// Cookie settings middleware
app.use((req, res, next) => {
  // Set default cookie options
  res.cookie('sessionId', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    path: '/',
    domain: process.env.NODE_ENV === 'production' ? '.qp-sphere.vercel.app' : 'localhost'
  });
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

// Email configuration
const EMAIL_USER = process.env.EMAIL_USER || 'quizingsphere@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS || 'iqok ayxq wexw yuhp';

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify email configuration on startup
transporter.verify()
  .then(() => console.log('Email service is ready'))
  .catch(err => console.error('Email service verification failed:', err));

// File upload endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    console.log('Received file upload request');
    
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: 'No file uploaded' 
      });
    }

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
    console.log('Upload notification email sent successfully');

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully and email notification sent',
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error uploading file or sending notification'
    });
  }
});

// Contact form endpoint
app.post('/send', async (req, res) => {
  try {
    console.log('Received contact form submission:', req.body);
    const { fullName, email, mobileNumber, subject, message } = req.body;

    // Validate input
    const errors = [];
    if (!fullName || fullName.length < 3) errors.push('Name must be at least 3 characters long');
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.push('Invalid email address');
    if (!mobileNumber || mobileNumber.length < 10) errors.push('Invalid mobile number');
    if (!subject) errors.push('Subject is required');
    if (!message || message.length < 10) errors.push('Message must be at least 10 characters long');

    if (errors.length > 0) {
      console.log('Validation errors:', errors);
      return res.status(400).json({ 
        success: false,
        message: 'Validation failed', 
        errors 
      });
    }

    const mailOptions = {
      from: `"${fullName}" <${email}>`,
      to: EMAIL_USER,
      subject: `New message from ${fullName}: ${subject}`,
      text: `Full Name: ${fullName}\nEmail: ${email}\nMobile: ${mobileNumber}\nSubject: ${subject}\nMessage: ${message}`,
      replyTo: email
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      return res.status(200).json({ 
        success: true,
        message: 'Message sent successfully!' 
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return res.status(500).json({ 
        success: false,
        message: 'Failed to send email',
        error: emailError.message
      });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: error.message
    });
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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});