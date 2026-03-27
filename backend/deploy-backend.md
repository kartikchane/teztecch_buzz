# Backend Deployment Guide - Render.com

## 🚀 Deploy Backend in 5 Steps

### Step 1: Push to GitHub

```powershell
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial backend commit"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/teztecch-buzz.git
git branch -M main
git push -u origin main
```

### Step 2: Go to Render.com

1. Visit: https://render.com
2. Sign up / Login with GitHub
3. Click "New +" → "Web Service"

### Step 3: Configure Service

**Repository Settings:**
- Select your repository
- Root Directory: `backend`
- Branch: `main`

**Build Settings:**
- Environment: `Node`
- Build Command: `npm install`
- Start Command: `npm start`

**Instance Settings:**
- Instance Type: `Free`
- Region: `Singapore` (closest to India)

### Step 4: Add Environment Variables

Click "Environment" tab and add:

```
NODE_ENV = production
PORT = 5000
MONGODB_URI = your-mongodb-connection-string-here
JWT_SECRET = your-super-secret-jwt-key-minimum-32-characters
JWT_EXPIRE = 7d
FRONTEND_URL = https://your-vercel-app-url.vercel.app
```

**Get MongoDB URI:**
1. Go to https://mongodb.com/cloud/atlas
2. Create FREE cluster
3. Create database user
4. Whitelist IP: 0.0.0.0/0
5. Get connection string
6. Replace <password> with actual password

### Step 5: Deploy!

1. Click "Create Web Service"
2. Wait 2-3 minutes for deployment
3. Copy your backend URL (e.g., https://teztecch-buzz.onrender.com)

## ✅ After Deployment

### Update Frontend

1. Update `.env` file:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

2. Redeploy frontend:
   ```powershell
   vercel --prod
   ```

### Test API

Visit: `https://your-backend-url.onrender.com/api/health`

Should return:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## 🔧 Troubleshooting

### Issue: Build fails
**Solution:** Check Node.js version in Render dashboard (should be 18+)

### Issue: MongoDB connection error
**Solution:** 
- Verify connection string is correct
- Check IP whitelist includes 0.0.0.0/0
- Verify database user password

### Issue: CORS error
**Solution:** 
- Verify FRONTEND_URL matches your Vercel URL exactly
- Include https://

## 📊 Monitor Your Backend

- **Logs:** Render Dashboard → Your Service → Logs
- **Health:** Visit `/api/health` endpoint
- **Metrics:** Render Dashboard shows CPU/Memory usage

## 💰 Free Tier Limits

Render Free Tier includes:
- ✅ 750 hours/month (always on for 1 app)
- ✅ Automatic SSL
- ✅ Auto-deploy from GitHub
- ⚠️ Spins down after 15 min inactivity (first request takes ~30 sec)

## 🔄 Auto-Deploy Setup

Render automatically deploys when you push to GitHub:

```powershell
# Make changes to backend
git add .
git commit -m "Update backend"
git push

# Render will auto-deploy! 🎉
```

## ✅ Deployment Complete!

Your backend is now live and production-ready! 🚀
