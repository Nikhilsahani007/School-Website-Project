# Deployment Checklist

Use this checklist to ensure everything is set up correctly before and after deployment.

## Pre-Deployment

### Code Preparation
- [ ] All code is committed to GitHub
- [ ] No hardcoded localhost URLs in production code
- [ ] All API calls use the config file (`config/api.js`)
- [ ] Environment variables are documented

### Backend Preparation
- [ ] MongoDB Atlas account created
- [ ] MongoDB cluster created and running
- [ ] Database user created with username and password
- [ ] IP whitelist configured (or `0.0.0.0/0` for all)
- [ ] Connection string copied
- [ ] Gmail App Password generated
- [ ] Backend code tested locally

### Frontend Preparation
- [ ] Frontend builds successfully (`npm run build`)
- [ ] No console errors in development
- [ ] All pages load correctly
- [ ] Forms submit successfully

---

## Backend Deployment (Render)

### Initial Setup
- [ ] Render account created
- [ ] GitHub repository connected to Render
- [ ] New Web Service created
- [ ] Root directory set to `siddhartha-school/server`
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`

### Environment Variables Set
- [ ] `NODE_ENV=production`
- [ ] `MONGODB_URI` (MongoDB Atlas connection string)
- [ ] `EMAIL_USER` (Gmail address)
- [ ] `EMAIL_PASS` (Gmail App Password)
- [ ] `FRONTEND_URL` (will update after frontend deployment)
- [ ] `PORT=10000` (optional, Render sets automatically)

### Deployment
- [ ] Service deployed successfully
- [ ] Backend URL copied (e.g., `https://xxx.onrender.com`)
- [ ] Health check endpoint works: `/api/health`
- [ ] No errors in Render logs

---

## Frontend Deployment (Vercel)

### Initial Setup
- [ ] Vercel account created
- [ ] GitHub repository connected to Vercel
- [ ] New project created
- [ ] Root directory set to `siddhartha-school/client`
- [ ] Framework preset: Vite (auto-detected)
- [ ] Build command: `npm run build` (auto-detected)
- [ ] Output directory: `dist` (auto-detected)

### Environment Variables (Optional)
- [ ] `VITE_API_URL` set to Render backend URL (optional)

### Deployment
- [ ] Project deployed successfully
- [ ] Frontend URL copied (e.g., `https://xxx.vercel.app`)
- [ ] Site loads correctly
- [ ] No console errors

---

## Post-Deployment

### Backend Updates
- [ ] Update `FRONTEND_URL` in Render to match Vercel URL
- [ ] Redeploy backend (if needed)
- [ ] Test CORS is working (no CORS errors in browser)

### Testing

#### Frontend Tests
- [ ] Home page loads
- [ ] All navigation links work
- [ ] Photo slider works
- [ ] Notices section loads data
- [ ] All pages accessible

#### API Tests
- [ ] Contact form submits successfully
- [ ] Admission form submits successfully
- [ ] Notices API returns data
- [ ] Fees API returns data
- [ ] Health check endpoint works

#### Email Tests
- [ ] Contact form sends email notification
- [ ] Admission form sends email notification
- [ ] Emails received at `sara252703@gmail.com`

#### Browser Console
- [ ] No CORS errors
- [ ] No 404 errors
- [ ] No 500 errors
- [ ] All API calls successful

---

## Final Verification

- [ ] Website is accessible publicly
- [ ] All forms work end-to-end
- [ ] Email notifications working
- [ ] Mobile responsive design works
- [ ] All images load correctly
- [ ] Performance is acceptable

---

## Troubleshooting Quick Reference

### Backend Issues
- Check Render logs for errors
- Verify all environment variables
- Test MongoDB connection
- Check email credentials

### Frontend Issues
- Check Vercel build logs
- Verify API URL configuration
- Check browser console
- Test API endpoints directly

### CORS Issues
- Verify `FRONTEND_URL` matches Vercel URL exactly
- Check backend CORS configuration
- Clear browser cache

### Email Issues
- Verify App Password (not regular password)
- Check Gmail 2FA is enabled
- Test email endpoint: `POST /api/test-email`

---

## Notes

- Render free tier may spin down after inactivity (15 minutes)
- First request after spin-down may be slow (cold start)
- Consider upgrading to paid tier for always-on service
- Vercel free tier is generous and should be sufficient

---

## Support Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)

