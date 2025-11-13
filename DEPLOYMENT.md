# Deployment Guide

This guide will help you deploy the Siddhartha Group of Schools website to Vercel (frontend) and Render (backend).

## Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
3. **Render Account** - Sign up at [render.com](https://render.com)
4. **MongoDB Atlas Account** - Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) (for production database)
5. **Gmail Account** - For email notifications (or use another email service)

---

## Part 1: Backend Deployment (Render)

### Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user (remember the username and password)
4. Whitelist your IP address (or use `0.0.0.0/0` for all IPs - less secure but easier)
5. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

### Step 2: Deploy Backend to Render

1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Go to Render Dashboard**
   - Visit [dashboard.render.com](https://dashboard.render.com)
   - Click "New +" → "Web Service"

3. **Connect GitHub Repository**
   - Select your repository
   - Choose the branch (usually `main`)

4. **Configure the Service**
   - **Name**: `siddhartha-school-backend` (or any name you prefer)
   - **Root Directory**: `siddhartha-school/server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. **Set Environment Variables**
   Click "Advanced" → "Add Environment Variable" and add:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   EMAIL_USER=sara252703@gmail.com
   EMAIL_PASS=your_gmail_app_password
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```
   (You'll update FRONTEND_URL after deploying the frontend)

6. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://siddhartha-school-backend.onrender.com`)

### Step 3: Test Backend

Visit `https://your-backend-url.onrender.com/api/health` - you should see a JSON response.

---

## Part 2: Frontend Deployment (Vercel)

### Step 1: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"

2. **Import GitHub Repository**
   - Select your repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `siddhartha-school/client`
   - **Build Command**: `npm run build` (should be auto-detected)
   - **Output Directory**: `dist` (should be auto-detected)
   - **Install Command**: `npm install` (should be auto-detected)

4. **Set Environment Variables** (Optional)
   - Go to "Environment Variables"
   - Add: `VITE_API_URL=https://your-backend-url.onrender.com`
   - (If not set, it will use the default from `config/api.js`)

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy your frontend URL (e.g., `https://siddhartha-school.vercel.app`)

### Step 2: Update Backend CORS

1. Go back to Render dashboard
2. Update the `FRONTEND_URL` environment variable to your Vercel URL
3. Redeploy the backend service

---

## Part 3: Gmail App Password Setup

To enable email notifications:

1. **Enable 2-Factor Authentication**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable "2-Step Verification"

2. **Generate App Password**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Other (Custom name)"
   - Enter "Siddhartha School Website"
   - Click "Generate"
   - Copy the 16-character password

3. **Add to Render Environment Variables**
   - Update `EMAIL_PASS` in Render with the app password

---

## Part 4: Testing

1. **Test Frontend**
   - Visit your Vercel URL
   - Check if the site loads correctly
   - Test navigation

2. **Test API Connection**
   - Open browser console
   - Check for any CORS errors
   - Try submitting the contact form

3. **Test Email Notifications**
   - Submit a contact form
   - Check if email is received at `sara252703@gmail.com`

---

## Troubleshooting

### Backend Issues

**Problem**: Backend not starting
- Check Render logs for errors
- Verify all environment variables are set
- Check MongoDB connection string format

**Problem**: CORS errors
- Verify `FRONTEND_URL` is set correctly in Render
- Check that your Vercel URL matches exactly

**Problem**: Email not sending
- Verify `EMAIL_PASS` is the App Password (not regular password)
- Check Render logs for email errors
- Test email endpoint: `POST /api/test-email`

### Frontend Issues

**Problem**: API calls failing
- Check browser console for errors
- Verify `VITE_API_URL` is set correctly (or default is used)
- Check backend is running and accessible

**Problem**: Build failing
- Check Vercel build logs
- Verify all dependencies are in `package.json`
- Check for TypeScript/ESLint errors

### Database Issues

**Problem**: MongoDB connection failing
- Verify connection string format
- Check IP whitelist in MongoDB Atlas
- Verify database user credentials

---

## Environment Variables Summary

### Backend (Render)
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
EMAIL_USER=sara252703@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=https://your-app.vercel.app
```

### Frontend (Vercel) - Optional
```
VITE_API_URL=https://your-backend.onrender.com
```

---

## Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] API endpoints working
- [ ] Contact form submitting successfully
- [ ] Admission form submitting successfully
- [ ] Email notifications working
- [ ] Notices loading correctly
- [ ] Fees data loading correctly
- [ ] CORS configured correctly
- [ ] All environment variables set

---

## Support

If you encounter issues:
1. Check the logs in Render (backend) and Vercel (frontend)
2. Check browser console for errors
3. Verify all environment variables are set correctly
4. Test API endpoints directly using Postman or curl

---

## Notes

- Render free tier may spin down after 15 minutes of inactivity
- First request after spin-down may take longer (cold start)
- Consider upgrading to paid tier for always-on service
- Vercel free tier is generous and should be sufficient for most use cases

