# Siddhartha Group of Schools Website

A modern, responsive school website built with React (Vite) and Node.js/Express.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd School-Website-Project/siddhartha-school
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Set up Environment Variables**

   **Backend** (`server/.env`):
   ```env
   MONGODB_URI=mongodb://localhost:27017/siddhartha_school
   PORT=5000
   EMAIL_USER=sara252703@gmail.com
   EMAIL_PASS=your_gmail_app_password
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   ```

   **Frontend** (`client/.env` - optional):
   ```env
   VITE_API_URL=http://localhost:5000
   ```

5. **Start Development Servers**

   **Backend** (in `server` directory):
   ```bash
   npm start
   # or for auto-reload:
   npm run dev
   ```

   **Frontend** (in `client` directory):
   ```bash
   npm run dev
   ```

6. **Open in Browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
siddhartha-school/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── config/        # Configuration files
│   │   └── ...
│   ├── vercel.json        # Vercel deployment config
│   └── package.json
│
├── server/                 # Backend (Node.js + Express)
│   ├── server.js          # Main server file
│   ├── render.yaml        # Render deployment config
│   └── package.json
│
└── DEPLOYMENT.md          # Detailed deployment guide
```

## 🛠️ Features

- ✅ Responsive design
- ✅ Contact form with email notifications
- ✅ Admission inquiry form
- ✅ Latest notices display
- ✅ Fee structure display
- ✅ Photo slider
- ✅ Management team showcase
- ✅ School branches information
- ✅ Modern UI with animations

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to:
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

## 🔧 Configuration

### API Endpoints

The frontend automatically detects the environment:
- **Development**: Uses `http://localhost:5000`
- **Production**: Uses `VITE_API_URL` or defaults to Render backend URL

Update `client/src/config/api.js` to change the default production URL.

### Email Setup

1. Enable 2-Factor Authentication on Gmail
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Add the App Password to `EMAIL_PASS` in backend `.env`

## 📝 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm start` - Start production server
- `npm run dev` - Start with nodemon (auto-reload)

## 🌐 Environment Variables

### Backend
- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)
- `EMAIL_USER` - Gmail address
- `EMAIL_PASS` - Gmail App Password
- `FRONTEND_URL` - Frontend URL for CORS
- `NODE_ENV` - Environment (development/production)

### Frontend
- `VITE_API_URL` - Backend API URL (optional)

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB is running (if using local)
- Verify all environment variables are set
- Check port 5000 is not in use

### Frontend can't connect to API
- Verify backend is running
- Check `VITE_API_URL` is correct
- Check browser console for CORS errors

### Email not sending
- Verify `EMAIL_PASS` is App Password (not regular password)
- Check Gmail 2FA is enabled
- Check backend logs for errors

## 📄 License

MIT

## 👥 Contributors

- Developed with ❤️ using MERN Stack

---

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

