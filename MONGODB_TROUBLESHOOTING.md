# 🔧 MongoDB Connection Troubleshooting Guide

## 🚨 **Current Issue: Registration Not Working**

Your backend is deployed but MongoDB connection is failing. Let's fix this step by step.

## 📋 **Step 1: Verify Your MongoDB Atlas Setup**

### 1.1 Check Your Connection String Format
Your MongoDB connection string should look like this:
```
mongodb+srv://username:password@cluster.mongodb.net/eventgenie?retryWrites=true&w=majority
```

**Common Issues:**
- ❌ Missing `mongodb+srv://` (using `mongodb://` instead)
- ❌ Wrong password (special characters need URL encoding)
- ❌ Wrong database name (should be `eventgenie`)
- ❌ Missing query parameters

### 1.2 Test Your Connection String
1. Go to MongoDB Atlas dashboard
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the exact connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with `eventgenie`

## 📋 **Step 2: Check Vercel Environment Variables**

### 2.1 Go to Your Vercel Dashboard
1. Visit: https://vercel.com/asharafshaik420-gmailcoms-projects/eventgenie
2. Click on your backend deployment
3. Go to **Settings** → **Environment Variables**

### 2.2 Verify Environment Variables
Make sure you have these variables set:

**Variable 1:**
- **Name**: `MONGO_URI`
- **Value**: Your complete MongoDB Atlas connection string
- **Environment**: Production, Preview, Development

**Variable 2:**
- **Name**: `NODE_ENV`
- **Value**: `production`
- **Environment**: Production, Preview, Development

### 2.3 Common Environment Variable Issues
- ❌ Variable name is wrong (should be `MONGO_URI`, not `MONGODB_URI`)
- ❌ Environment not set to "Production"
- ❌ Connection string has extra spaces
- ❌ Special characters in password not URL encoded

## 📋 **Step 3: Test Your Backend**

### 3.1 Test Root Endpoint
Visit: https://eventgenie-9rcvzzywb-asharafshaik420-gmailcoms-projects.vercel.app/

**Expected Response:** "EventGenie Backend is Running 🚀"

### 3.2 Test API Endpoints
Visit: https://eventgenie-9rcvzzywb-asharafshaik420-gmailcoms-projects.vercel.app/api/services

**Expected Response:** JSON array (may be empty initially)

### 3.3 Check Vercel Logs
1. Go to your Vercel dashboard
2. Click on your backend deployment
3. Go to **Functions** tab
4. Check for error logs

## 📋 **Step 4: Common MongoDB Atlas Issues**

### 4.1 Network Access
1. Go to MongoDB Atlas → Network Access
2. Make sure you have "Allow Access from Anywhere" (0.0.0.0/0)
3. Or add Vercel's IP ranges

### 4.2 Database User
1. Go to MongoDB Atlas → Database Access
2. Verify your user has "Read and write to any database" privileges
3. Check if username and password are correct

### 4.3 Cluster Status
1. Go to MongoDB Atlas → Clusters
2. Make sure your cluster is active (green status)
3. Check if cluster is in the correct region

## 📋 **Step 5: URL Encode Special Characters**

If your password contains special characters, you need to URL encode them:

**Common Encodings:**
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- `%` becomes `%25`
- `&` becomes `%26`
- `+` becomes `%2B`
- `/` becomes `%2F`
- `:` becomes `%3A`
- `=` becomes `%3D`
- `?` becomes `%3F`
- ` ` (space) becomes `%20`

**Example:**
If your password is `my@password#123`, it should be `my%40password%23123`

## 📋 **Step 6: Redeploy After Changes**

After updating environment variables:

```bash
cd server
vercel --prod
```

## 📋 **Step 7: Update Frontend**

After backend is working, update frontend environment variables:

1. Go to frontend Vercel dashboard
2. Update `VITE_API_BASE_URL` to: `https://eventgenie-9rcvzzywb-asharafshaik420-gmailcoms-projects.vercel.app`
3. Redeploy frontend

## 🔍 **Debugging Steps**

### Check Connection String Format
```javascript
// Correct format
mongodb+srv://username:password@cluster.mongodb.net/eventgenie?retryWrites=true&w=majority

// Wrong formats
mongodb://username:password@cluster.mongodb.net/eventgenie  // Missing +srv
mongodb+srv://username:password@cluster.mongodb.net/       // Missing database name
mongodb+srv://username:password@cluster.mongodb.net/test   // Wrong database name
```

### Test Locally (Optional)
1. Create `.env` file in server directory:
```
MONGO_URI=your_mongodb_atlas_connection_string
NODE_ENV=development
PORT=5001
```

2. Run test:
```bash
cd server
node test-mongo.js
```

## 🎯 **Your Current URLs**

### Backend (Updated):
https://eventgenie-9rcvzzywb-asharafshaik420-gmailcoms-projects.vercel.app

### Frontend:
https://eventgenie-5gsc43qz2-asharafshaik420-gmailcoms-projects.vercel.app

## 📞 **Need Help?**

If you're still having issues:
1. Share your MongoDB Atlas connection string (with password hidden)
2. Check Vercel deployment logs
3. Test the backend URL directly
4. Verify environment variables are set correctly

