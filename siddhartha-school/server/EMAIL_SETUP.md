# Email Notification Setup Guide

This guide explains how to configure email notifications for the Siddhartha Model School website.

## Overview

The website sends automated email notifications to **sara252703@gmail.com** when:
- A user submits the Contact Form
- A user submits the Admission Form

## Gmail SMTP Configuration

The application uses Gmail SMTP to send emails. To set this up:

### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security**
3. Enable **2-Step Verification** if not already enabled

### Step 2: Generate an App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Select **Mail** as the app
3. Select **Other (Custom name)** as the device
4. Enter "Siddhartha School Website" as the name
5. Click **Generate**
6. Copy the 16-character password (you'll use this in the .env file)

### Step 3: Create .env File

Create a `.env` file in the `siddhartha-school/back-end` directory with the following:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/siddhartha_school

# Server Port
PORT=5000

# Email Configuration (Gmail)
EMAIL_USER=sara252703@gmail.com
EMAIL_PASS=your_16_character_app_password_here
```

**Important:** Replace `your_16_character_app_password_here` with the app password you generated in Step 2.

### Step 4: Alternative Email Services

If you prefer to use a different email service (like SendGrid, Mailgun, etc.), you can modify the `createTransporter()` function in `server.js`:

```javascript
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.your-email-service.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};
```

## Testing

After setting up the email configuration:

1. Start the backend server:
   ```bash
   cd siddhartha-school/back-end
   npm start
   ```

2. Test by submitting a form on the website
3. Check `sara252703@gmail.com` for the notification email

## Troubleshooting

### Email Not Sending

- Verify that the app password is correct (no spaces)
- Check that 2-Factor Authentication is enabled
- Ensure the `.env` file is in the correct location
- Check server logs for error messages

### Gmail Blocking

- Gmail may require you to "Allow less secure apps" (not recommended)
- Using an App Password (as described above) is the recommended and secure method

## Security Notes

- Never commit your `.env` file to version control
- Keep your app password secure
- The `.env` file is already included in `.gitignore`

## Email Templates

The email notifications include:
- **Contact Form**: Name, email, phone, inquiry type, message, and timestamp
- **Admission Form**: Student name, parent name, email, phone, class, previous school, address, and timestamp

Both emails are formatted with HTML styling for professional presentation.

