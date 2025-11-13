# Environment Variables Setup

## Backend Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# MongoDB Connection String
# For local development:
MONGODB_URI=mongodb://localhost:27017/siddhartha_school

# For production (MongoDB Atlas):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Server Port
PORT=5000

# Email Configuration (Gmail)
EMAIL_USER=sara252703@gmail.com
EMAIL_PASS=your_gmail_app_password_here

# Frontend URL (for CORS)
# For local development:
FRONTEND_URL=http://localhost:5173

# For production (update after deploying frontend):
# FRONTEND_URL=https://your-app.vercel.app

# Node Environment
NODE_ENV=development
```

## Frontend Environment Variables (Optional)

Create a `.env` file in the `client` directory (optional):

```env
# API URL (optional)
# If not set, will use localhost:5000 in development
# and default Render URL in production
VITE_API_URL=http://localhost:5000
```

## Getting Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable "2-Step Verification" if not already enabled
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" and "Other (Custom name)"
5. Enter "Siddhartha School Website"
6. Click "Generate"
7. Copy the 16-character password
8. Use this password in `EMAIL_PASS` (not your regular Gmail password)

## For Production Deployment

### Render (Backend)
Set these environment variables in Render dashboard:
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASS` - Your Gmail App Password
- `FRONTEND_URL` - Your Vercel frontend URL
- `NODE_ENV=production`
- `PORT=10000` (Render sets this automatically)

### Vercel (Frontend)
Set this environment variable (optional):
- `VITE_API_URL` - Your Render backend URL (e.g., `https://siddhartha-school-backend.onrender.com`)

If `VITE_API_URL` is not set, the app will use the default URL from `config/api.js`.

