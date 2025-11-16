const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();

// Middleware
// CORS configuration for production
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://siddharthagroupofschools.vercel.app"
  ],
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/siddhartha_school';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch((err) => {
  console.error('❌ MongoDB Connection Error:', err);
  console.error('⚠️  Server will continue running, but database operations will fail.');
  // Note: Server continues to run even if MongoDB fails
  // This allows the API to respond with error messages rather than crashing
});

// Mongoose Schemas
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  inquiryType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const AdmissionSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  parentName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  class: { type: String, required: true },
  previousSchool: String,
  address: String,
  createdAt: { type: Date, default: Date.now }
});

const FeeSchema = new mongoose.Schema({
  class: { type: String, required: true },
  tuitionFee: { type: Number, required: true },
  transportFee: { type: Number, required: true },
  otherFees: { type: Number, required: true },
  total: { type: Number, required: true }
});

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' }
});

// Models
const Contact = mongoose.model('Contact', ContactSchema);
const Admission = mongoose.model('Admission', AdmissionSchema);
const Fee = mongoose.model('Fee', FeeSchema);
const Notice = mongoose.model('Notice', NoticeSchema);

// Email Configuration
const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER || 'sara252703@gmail.com';
  const emailPass = process.env.EMAIL_PASS || process.env.EMAIL_APP_PASSWORD;
  
  // Check if email credentials are configured
  if (!emailPass) {
    console.warn('⚠️  WARNING: EMAIL_PASS or EMAIL_APP_PASSWORD not set in .env file!');
    console.warn('⚠️  Email notifications will not work. Please configure your .env file.');
  }
  
  // Gmail SMTP configuration
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: emailUser,
      pass: emailPass
    },
    tls: {
      minVersion: "TLSv1.2",
      rejectUnauthorized: false
    }
  });
};

const sendEmail = async (subject, htmlContent, recipientEmail = null) => {
  try {
    const emailUser = process.env.EMAIL_USER || 'sara252703@gmail.com';
    const emailPass = process.env.EMAIL_PASS || process.env.EMAIL_APP_PASSWORD;

    const recipient = recipientEmail || process.env.EMAIL_RECIPIENT || 'sara252703@gmail.com';

    if (!emailPass) {
      console.error('❌ Email not sent: EMAIL_PASS or EMAIL_APP_PASSWORD not configured in .env file');
      return { success: false, error: 'Email credentials not configured' };
    }

    console.log('📧 Attempting to send email...');
    console.log('   From:', emailUser);
    console.log('   To:', recipient);
    console.log('   Subject:', subject);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: emailUser,
      to: recipient,
      subject,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully!');
    console.log('   Message ID:', info.messageId);

    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('❌ Email sending error:', error.message);
    return { success: false, error: error.message };
  }
};

// Routes

// Contact Form
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message, inquiryType } = req.body;

    // Validation
    if (!name || !email || !phone || !message || !inquiryType) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const contact = new Contact({
      name,
      email,
      phone,
      message,
      inquiryType
    });

    await contact.save();

    // Send email notification
    const emailSubject = `New Contact Form Submission - ${inquiryType}`;
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #4f46e5; }
          .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 3px solid #4f46e5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Inquiry Type:</div>
              <div class="value">${inquiryType}</div>
            </div>
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${phone}</div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${message}</div>
            </div>
            <div class="field">
              <div class="label">Submitted At:</div>
              <div class="value">${new Date().toLocaleString()}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email notification
    const emailResult = await sendEmail(emailSubject, emailHtml);
    if (!emailResult.success) {
      console.error('⚠️  Failed to send contact form email:', emailResult.error);
      // Don't fail the request if email fails - form submission still succeeds
    }

    res.status(201).json({ 
      message: 'Contact inquiry submitted successfully',
      data: contact
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Admission Form
app.post('/api/admissions', async (req, res) => {
  try {
    const { studentName, parentName, email, phone, class: studentClass, previousSchool, address } = req.body;

    if (!studentName || !parentName || !email || !phone || !studentClass) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const admission = new Admission({
      studentName,
      parentName,
      email,
      phone,
      class: studentClass,
      previousSchool,
      address
    });

    await admission.save();

    // Send email notification
    const emailSubject = `New Admission Inquiry - ${studentName} for Class ${studentClass}`;
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #4f46e5; }
          .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; border-left: 3px solid #4f46e5; }
          .highlight { background: #fef3c7; padding: 15px; border-radius: 4px; border-left: 4px solid #f59e0b; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Admission Inquiry</h2>
          </div>
          <div class="content">
            <div class="highlight">
              <strong>Student:</strong> ${studentName}<br>
              <strong>Applying for:</strong> Class ${studentClass}
            </div>
            <div class="field">
              <div class="label">Student Name:</div>
              <div class="value">${studentName}</div>
            </div>
            <div class="field">
              <div class="label">Parent/Guardian Name:</div>
              <div class="value">${parentName}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${phone}</div>
            </div>
            <div class="field">
              <div class="label">Class Applying For:</div>
              <div class="value">${studentClass}</div>
            </div>
            ${previousSchool ? `
            <div class="field">
              <div class="label">Previous School:</div>
              <div class="value">${previousSchool}</div>
            </div>
            ` : ''}
            ${address ? `
            <div class="field">
              <div class="label">Address:</div>
              <div class="value">${address}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Submitted At:</div>
              <div class="value">${new Date().toLocaleString()}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email notification
    const emailResult = await sendEmail(emailSubject, emailHtml);
    if (!emailResult.success) {
      console.error('⚠️  Failed to send admission form email:', emailResult.error);
      // Don't fail the request if email fails - form submission still succeeds
    }

    res.status(201).json({ 
      message: 'Admission inquiry submitted successfully',
      data: admission
    });
  } catch (error) {
    console.error('Admission submission error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Get Fees
app.get('/api/fees', async (req, res) => {
  try {
    let fees = await Fee.find();
    
    // If no fees in database, return default data
    if (fees.length === 0) {
      fees = [
        { class: 'Nursery - UKG', tuitionFee: 25000, transportFee: 12000, otherFees: 5000, total: 42000 },
        { class: 'Class I - V', tuitionFee: 35000, transportFee: 15000, otherFees: 8000, total: 58000 },
        { class: 'Class VI - VIII', tuitionFee: 45000, transportFee: 15000, otherFees: 10000, total: 70000 },
        { class: 'Class IX - X', tuitionFee: 55000, transportFee: 18000, otherFees: 12000, total: 85000 }
      ];
    }
    
    // Filter out Class XI - XII entries (school only goes up to 10th standard)
    fees = fees.filter(fee => !fee.class.includes('XI') && !fee.class.includes('XII'));
    
    res.status(200).json(fees);
  } catch (error) {
    console.error('Fees fetch error:', error);
    res.status(500).json({ message: 'Error fetching fees' });
  }
});

// Get Notices
app.get('/api/notices', async (req, res) => {
  try {
    let notices = await Notice.find().sort({ date: -1 }).limit(10);
    
    // If no notices in database, return sample notices
    if (notices.length === 0) {
      notices = [
        {
          title: 'Upcoming Annual Examinations',
          content: 'Annual examinations for all classes will commence from March 15, 2024. Students are advised to complete their syllabus and prepare thoroughly. Detailed timetable will be shared soon.',
          date: new Date(),
          priority: 'high',
          _id: 'sample1'
        },
        {
          title: 'Assignment Submission Deadline',
          content: 'All pending assignments for Classes VI to XII must be submitted by February 28, 2024. Late submissions will not be accepted. Please contact your respective class teachers for any queries.',
          date: new Date(Date.now() - 86400000),
          priority: 'high',
          _id: 'sample2'
        },
        {
          title: 'Holiday Notice - Holi Festival',
          content: 'School will remain closed on March 8, 2024 (Holi) and March 9, 2024. Classes will resume on March 11, 2024. Wishing all students and staff a happy and safe Holi celebration!',
          date: new Date(Date.now() - 172800000),
          priority: 'medium',
          _id: 'sample3'
        },
        {
          title: 'Parent-Teacher Meeting',
          content: 'Scheduled parent-teacher meetings for all classes will be held on March 5, 2024. Parents are requested to attend and discuss their child\'s academic progress with the teachers.',
          date: new Date(Date.now() - 259200000),
          priority: 'medium',
          _id: 'sample4'
        }
      ];
    }
    
    res.status(200).json(notices);
  } catch (error) {
    console.error('Notices fetch error:', error);
    res.status(500).json({ message: 'Error fetching notices' });
  }
});

// Create Notice
// SECURITY NOTE: This endpoint currently has no authentication.
// In production, add authentication middleware (e.g., JWT, API key) to protect this endpoint.
app.post('/api/notices', async (req, res) => {
  try {
    const { title, content, priority } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const notice = new Notice({ title, content, priority });
    await notice.save();
    
    res.status(201).json({ 
      message: 'Notice created successfully',
      data: notice
    });
  } catch (error) {
    console.error('Notice creation error:', error);
    res.status(500).json({ message: 'Error creating notice' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Siddhartha Group of Schools API',
    status: 'Server is running',
    endpoints: {
      health: '/api/health',
      contact: 'POST /api/contact',
      admissions: 'POST /api/admissions',
      fees: 'GET /api/fees',
      notices: 'GET /api/notices',
      testEmail: 'POST /api/test-email'
    },
    timestamp: new Date()
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running', timestamp: new Date() });
});

// Test email endpoint
app.post('/api/test-email', async (req, res) => {
  try {
    const emailSubject = 'Test Email - Siddhartha Model School';
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Test Email</h2>
          </div>
          <div class="content">
            <p>This is a test email from Siddhartha Model School website.</p>
            <p>If you received this email, your email configuration is working correctly!</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const result = await sendEmail(emailSubject, emailHtml);
    
    if (result.success) {
      res.status(200).json({ 
        success: true, 
        message: 'Test email sent successfully!',
        messageId: result.messageId
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to send test email',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error sending test email',
      error: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Don't exit in production, log and continue
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit in production, log and continue
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ MongoDB URI: ${process.env.MONGODB_URI ? 'Set' : 'Not set (using default)'}`);
  console.log(`✅ Email User: ${process.env.EMAIL_USER ? 'Set' : 'Not set'}`);
  console.log(`✅ Frontend URL: ${process.env.FRONTEND_URL || 'Not set'}`);
});