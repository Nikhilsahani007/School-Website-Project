// Quick test script to check email configuration
require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('🔍 Checking email configuration...\n');

const emailUser = process.env.EMAIL_USER || 'sara252703@gmail.com';
const emailPass = process.env.EMAIL_PASS || process.env.EMAIL_APP_PASSWORD;

console.log('Email User:', emailUser);
console.log('Email Pass:', emailPass ? '***' + emailPass.slice(-4) : '❌ NOT SET');
console.log('');

if (!emailPass) {
  console.error('❌ ERROR: EMAIL_PASS or EMAIL_APP_PASSWORD is not set in .env file!');
  console.error('');
  console.error('Please create a .env file in the back-end folder with:');
  console.error('EMAIL_USER=sara252703@gmail.com');
  console.error('EMAIL_PASS=your_gmail_app_password');
  console.error('');
  console.error('To get a Gmail App Password:');
  console.error('1. Go to: https://myaccount.google.com/apppasswords');
  console.error('2. Generate an app password for "Mail"');
  console.error('3. Copy the 16-character password');
  console.error('4. Add it to your .env file');
  process.exit(1);
}

async function testEmail() {
  try {
    console.log('📧 Creating transporter...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    console.log('🔗 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified!\n');

    console.log('📤 Sending test email...');
    const info = await transporter.sendMail({
      from: emailUser,
      to: 'sara252703@gmail.com',
      subject: 'Test Email - Siddhartha Model School',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email from Siddhartha Model School website.</p>
        <p>If you received this, your email configuration is working!</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      `
    });

    console.log('✅ Test email sent successfully!');
    console.log('   Message ID:', info.messageId);
    console.log('   Response:', info.response);
    console.log('');
    console.log('📬 Check your inbox at sara252703@gmail.com');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'EAUTH') {
      console.error('');
      console.error('Authentication failed!');
      console.error('Please check:');
      console.error('1. Your email address is correct');
      console.error('2. You are using a Gmail App Password (not your regular password)');
      console.error('3. 2-Factor Authentication is enabled on your Google account');
    } else if (error.code === 'ECONNECTION') {
      console.error('');
      console.error('Connection failed! Check your internet connection.');
    }
    process.exit(1);
  }
}

testEmail();

