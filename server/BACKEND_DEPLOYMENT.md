# EventGenie Backend Deployment Guide

## Prerequisites
- Node.js 18+ installed
- Vercel CLI installed (`npm i -g vercel`)
- MongoDB Atlas account (for cloud database)

## Step 1: Set Up MongoDB Atlas Database

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (M0 Free tier is sufficient)

### 1.2 Configure Database Access
1. Go to **Database Access** in the left sidebar
2. Click **Add New Database User**
3. Create a username and password (save these!)
4. Set privileges to **Read and write to any database**

### 1.3 Configure Network Access
1. Go to **Network Access** in the left sidebar
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (for development)
4. Or add specific IP addresses for production

### 1.4 Get Connection String
1. Go to **Clusters** in the left sidebar
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `eventgenie`

Example connection string:
```
mongodb+srv://username:password@cluster.mongodb.net/eventgenie?retryWrites=true&w=majority
```

## Step 2: Deploy Backend to Vercel

### 2.1 Navigate to Backend Directory
```bash
cd server
```

### 2.2 Install Dependencies
```bash
npm install
```

### 2.3 Deploy to Vercel
```bash
# Login to Vercel (if not already logged in)
vercel login

# Deploy
vercel --prod
```

### 2.4 Configure Environment Variables in Vercel Dashboard
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - **Name**: `MONGO_URI`
   - **Value**: Your MongoDB Atlas connection string
   - **Environment**: Production, Preview, Development

4. Add:
   - **Name**: `NODE_ENV`
   - **Value**: `production`
   - **Environment**: Production, Preview, Development

### 2.5 Redeploy After Environment Variables
```bash
vercel --prod
```

## Step 3: Test Your Backend API

### 3.1 Test Root Endpoint
Visit your backend URL (provided by Vercel) to see if it's running:
```
https://your-backend-url.vercel.app/
```
Should show: "EventGenie Backend is Running 🚀"

### 3.2 Test API Endpoints
Test these endpoints to ensure they work:
- `GET /api/services` - Should return services list
- `GET /` - Should return welcome message

## Step 4: Update Frontend Environment Variables

### 4.1 Update Frontend API URL
1. Go to your frontend Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Update `VITE_API_BASE_URL` to your backend URL:
   ```
   VITE_API_BASE_URL=https://your-backend-url.vercel.app
   ```

### 4.2 Redeploy Frontend
```bash
cd ../eventgenie
vercel --prod
```

## Step 5: Initialize Admin User (Optional)

### 5.1 Run Admin Initialization
If you want to create an admin user, you can run the initialization script locally:

1. Create a `.env` file in the server directory:
```bash
MONGO_URI=your_mongodb_atlas_connection_string
NODE_ENV=development
PORT=5001
```

2. Run the admin initialization:
```bash
npm run init-admin
```

## Troubleshooting

### Issue 1: MongoDB Connection Failed
**Error**: MongoDB Connection Error
**Solution**:
- Check your MongoDB Atlas connection string
- Ensure network access allows connections
- Verify database user credentials

### Issue 2: Vercel Deployment Failed
**Error**: Build failed
**Solution**:
- Check if all dependencies are in package.json
- Ensure Node.js version is 18+
- Check Vercel deployment logs

### Issue 3: CORS Errors
**Error**: CORS policy blocking requests
**Solution**:
- The backend already includes CORS middleware
- If issues persist, check frontend URL in CORS configuration

### Issue 4: Environment Variables Not Working
**Error**: Variables not accessible
**Solution**:
- Ensure variables are set in Vercel dashboard
- Redeploy after adding variables
- Check variable names match exactly

## Production Checklist

- [ ] MongoDB Atlas database set up
- [ ] Database user created with proper permissions
- [ ] Network access configured
- [ ] Backend deployed to Vercel
- [ ] Environment variables configured
- [ ] API endpoints tested
- [ ] Frontend environment variables updated
- [ ] Frontend redeployed
- [ ] Full application tested

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify MongoDB Atlas configuration
3. Test API endpoints individually
4. Check environment variables
5. Review CORS configuration
