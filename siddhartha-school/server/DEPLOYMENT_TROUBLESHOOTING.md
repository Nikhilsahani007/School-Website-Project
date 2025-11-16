# Deployment Troubleshooting Guide

## Common Errors and Solutions

### 1. **MongoDB Connection Error**

**Error Message:**
```
❌ MongoDB Connection Error: ...
```

**Possible Causes:**
- `MONGODB_URI` environment variable not set in Render
- Incorrect MongoDB connection string format
- MongoDB Atlas IP whitelist not configured
- Network connectivity issues

**Solutions:**
1. **Check Environment Variables in Render:**
   - Go to your Render dashboard
   - Navigate to your service → Environment
   - Verify `MONGODB_URI` is set correctly
   - Format should be: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`

2. **Check MongoDB Atlas:**
   - Log into MongoDB Atlas
   - Go to Network Access
   - Add `0.0.0.0/0` to allow all IPs (or add Render's IP)
   - Verify database user credentials

3. **Test Connection:**
   - Use the health endpoint: `GET /api/health`
   - Check Render logs for detailed error messages

---

### 2. **Email Authentication Error**

**Error Message:**
```
❌ Email sending error: EAUTH
Authentication failed. Check your email and app password.
```

**Possible Causes:**
- `EMAIL_PASS` not set or incorrect
- Using regular Gmail password instead of App Password
- 2-Factor Authentication not enabled

**Solutions:**
1. **Verify Environment Variables:**
   - Check `EMAIL_USER` is set correctly
   - Check `EMAIL_PASS` is set (should be 16-character App Password)

2. **Generate New App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Generate new password for "Mail"
   - Update `EMAIL_PASS` in Render with new password

3. **Test Email:**
   - Use test endpoint: `POST /api/test-email`
   - Check logs for detailed error

---

### 3. **CORS Error**

**Error Message:**
```
Not allowed by CORS
```

**Possible Causes:**
- `FRONTEND_URL` not set correctly
- Frontend URL doesn't match exactly (including https/http)
- CORS configuration issue

**Solutions:**
1. **Set FRONTEND_URL in Render:**
   - Get your Vercel frontend URL (e.g., `https://your-site.vercel.app`)
   - Set `FRONTEND_URL` in Render environment variables
   - Make sure it matches exactly (including protocol)

2. **Check CORS Configuration:**
   - Verify the URL in Render matches your Vercel URL exactly
   - No trailing slashes
   - Include `https://` protocol

3. **Redeploy:**
   - After updating `FRONTEND_URL`, redeploy the backend

---

### 4. **Port Error**

**Error Message:**
```
Error: listen EADDRINUSE: address already in use
```

**Solutions:**
- Render automatically sets the PORT, so this shouldn't happen
- If it does, check Render logs
- The PORT environment variable is optional in Render

---

### 5. **Module Not Found / Dependency Error**

**Error Message:**
```
Error: Cannot find module '...'
```

**Solutions:**
1. **Check package.json:**
   - Verify all dependencies are listed
   - Check `package-lock.json` is committed

2. **Rebuild:**
   - In Render, trigger a manual deploy
   - Check build logs for npm install errors

---

### 6. **Server Not Starting**

**Error Message:**
```
Application failed to respond
```

**Possible Causes:**
- Server crashed on startup
- Wrong start command
- Missing environment variables causing crash

**Solutions:**
1. **Check Render Logs:**
   - Go to Render dashboard → Logs
   - Look for error messages at startup
   - Check for missing environment variables

2. **Verify Start Command:**
   - Should be: `npm start`
   - Root directory: `siddhartha-school/server`

3. **Check Environment Variables:**
   - Verify all required variables are set
   - Check for typos in variable names

---

## Quick Diagnostic Steps

### Step 1: Check Render Logs
1. Go to Render dashboard
2. Click on your service
3. Go to "Logs" tab
4. Look for error messages (usually in red)
5. Copy the full error message

### Step 2: Test Health Endpoint
```bash
curl https://your-backend-url.onrender.com/api/health
```
Should return:
```json
{"status":"Server is running","timestamp":"..."}
```

### Step 3: Check Environment Variables
In Render dashboard, verify these are set:
- ✅ `NODE_ENV=production`
- ✅ `MONGODB_URI=<your-connection-string>`
- ✅ `EMAIL_USER=<your-email>`
- ✅ `EMAIL_PASS=<app-password>`
- ✅ `FRONTEND_URL=<your-vercel-url>`

### Step 4: Test Individual Endpoints
```bash
# Health check
curl https://your-backend-url.onrender.com/api/health

# Get fees
curl https://your-backend-url.onrender.com/api/fees

# Get notices
curl https://your-backend-url.onrender.com/api/notices
```

---

## Common Render-Specific Issues

### 1. **Service Spinning Down**
- Render free tier spins down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds
- This is normal behavior for free tier

### 2. **Build Failures**
- Check build logs in Render
- Common issues:
  - Missing dependencies in package.json
  - Syntax errors in code
  - Wrong Node.js version

### 3. **Environment Variable Sync**
- If using `render.yaml`, variables marked `sync: false` must be set manually
- Go to Environment tab and add them manually

---

## Getting Help

If you're still experiencing issues:

1. **Copy the full error message** from Render logs
2. **Check which endpoint is failing** (if any)
3. **Verify all environment variables** are set correctly
4. **Test locally first** to isolate the issue

Common things to check:
- ✅ All environment variables set in Render
- ✅ MongoDB Atlas IP whitelist configured
- ✅ Gmail App Password is correct (not regular password)
- ✅ Frontend URL matches exactly in CORS config
- ✅ Build completes successfully
- ✅ Server starts without errors

---

## Quick Fixes Checklist

- [ ] MongoDB URI is correct and accessible
- [ ] All environment variables are set in Render
- [ ] Gmail App Password is correct (16 characters)
- [ ] FRONTEND_URL matches your Vercel URL exactly
- [ ] Build completes successfully
- [ ] Server logs show "Server running on port..."
- [ ] Health endpoint returns 200 status
- [ ] No CORS errors in browser console

