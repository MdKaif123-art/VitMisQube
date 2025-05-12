const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
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
    if (!message || message.length < 2) errors.push('Message must be at least 2 characters long');

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

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return res.status(200).json({ 
      success: true,
      message: 'Message sent successfully!' 
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Routes
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: 'No file uploaded' 
      });
    }

    // Send email notification
    const mailOptions = {
      from: EMAIL_USER,
      to: EMAIL_USER,
      subject: 'New File Upload Notification',
      text: `A new file has been uploaded:
Filename: ${req.file.originalname}
Stored as: ${req.file.filename}
Size: ${req.file.size} bytes
Upload time: ${new Date().toLocaleString()}`,
      attachments: [
        {
          filename: req.file.originalname,
          path: req.file.path
        }
      ]
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Upload notification email sent successfully');
    } catch (emailError) {
      console.error('Error sending upload notification email:', emailError);
      // Continue with the response even if email fails
    }

    res.json({ 
      success: true,
      message: 'File uploaded successfully and notification sent',
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error uploading file' 
    });
  }
});

app.get('/api/papers', (req, res) => {
  try {
    if (!fs.existsSync(uploadDir)) {
      return res.json([]);
    }
    const files = fs.readdirSync(uploadDir);
    const papers = files.map(filename => ({
      id: filename,
      name: filename,
      url: `/uploads/${filename}`
    }));
    res.json(papers);
  } catch (error) {
    console.error('Error reading papers:', error);
    res.status(500).json({ message: 'Error fetching papers' });
  }
});

// Serve uploaded files
app.use('/uploads', express.static(uploadDir));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 