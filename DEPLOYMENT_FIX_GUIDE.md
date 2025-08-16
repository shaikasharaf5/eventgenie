# EventGenie Registration Fix Guide

## Problem Identified
Your frontend is trying to connect to `http://localhost:5001` instead of your deployed backend URL, which is why user registration is failing.

## Solution Steps

### 1. Backend Deployment (Vercel)

First, ensure your backend is properly deployed on Vercel:

```bash
# Navigate to server directory
cd server

# Deploy to Vercel
vercel --prod
```

**Important Environment Variables to Set in Vercel:**
- `MONGO_URI`: Your MongoDB Atlas connection string
- `NODE_ENV`: `production`

### 2. Frontend Deployment (Vercel)

After deploying the backend, get your backend URL (e.g., `https://eventgenie-backend.vercel.app`) and update the frontend:

```bash
# Navigate to frontend directory
cd eventgenie

# Deploy to Vercel
vercel --prod
```

**Important Environment Variables to Set in Vercel:**
- `VITE_API_BASE_URL`: Your backend URL (e.g., `https://eventgenie-backend.vercel.app`)

### 3. Manual Environment Variable Setup

If you need to set environment variables manually in Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add the following variables:

**For Backend:**
- `MONGO_URI`: `mongodb+srv://asharafshaik420:Ashu%40123%23%24@eventgenie.rnpdbqn.mongodb.net/eventgenie?retryWrites=true&w=majority&appName=EventGenie`
- `NODE_ENV`: `production`

**For Frontend:**
- `VITE_API_BASE_URL`: `https://your-backend-url.vercel.app`

### 4. Code Changes Made

I've already updated your code to use environment variables instead of hardcoded localhost URLs:

✅ Updated `vercel.json` in frontend to use environment variable
✅ Fixed all hardcoded `localhost:5001` URLs in React components
✅ Updated API calls to use `import.meta.env.VITE_API_BASE_URL`

### 5. Testing the Fix

After deployment:

1. **Test Backend**: Visit your backend URL directly
   - Should show: "EventGenie Backend is Running 🚀"

2. **Test Registration**: Try registering a new user
   - Should work without "Registration failed" error

3. **Test Login**: Try logging in with the registered user
   - Should redirect to profile page

### 6. Common Issues and Solutions

**Issue**: "Registration failed. Please try again."
- **Solution**: Check that `VITE_API_BASE_URL` is set correctly in frontend

**Issue**: "MongoDB Connection Error"
- **Solution**: Verify `MONGO_URI` is set correctly in backend

**Issue**: CORS errors
- **Solution**: Backend CORS is already configured for production

### 7. Verification Commands

Test your backend locally:
```bash
cd server
node test-api.js
```

Test your frontend locally:
```bash
cd eventgenie
npm run dev
```

### 8. Deployment Checklist

- [ ] Backend deployed to Vercel with correct environment variables
- [ ] Frontend deployed to Vercel with correct `VITE_API_BASE_URL`
- [ ] MongoDB Atlas connection working
- [ ] Registration form working
- [ ] Login form working
- [ ] All API endpoints responding correctly

## Quick Fix Commands

```bash
# Deploy backend
cd server && vercel --prod

# Deploy frontend (after getting backend URL)
cd eventgenie && vercel --prod
```

After deployment, your registration should work properly!
