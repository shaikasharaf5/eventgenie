# 🚀 Complete EventGenie Setup Guide

## ✅ What's Already Done

### Frontend (React App)
- ✅ Deployed to Vercel: https://eventgenie-km1m97pt8-asharafshaik420-gmailcoms-projects.vercel.app
- ✅ All hardcoded localhost URLs fixed
- ✅ Environment variables configured
- ✅ Build issues resolved

### Backend (Node.js API)
- ✅ Deployed to Vercel: https://eventgenie-osa21t0lf-asharafshaik420-gmailcoms-projects.vercel.app
- ✅ Serverless configuration set up
- ✅ API routes configured

## 🔧 What You Need to Complete

### Step 1: Set Up MongoDB Atlas Database

#### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" and create an account
3. Choose the free tier (M0)

#### 1.2 Create Database Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider and region
4. Click "Create"

#### 1.3 Configure Database Access
1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Create a username (e.g., `eventgenie_user`)
4. Create a password (save this!)
5. Set privileges to "Read and write to any database"
6. Click "Add User"

#### 1.4 Configure Network Access
1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

#### 1.5 Get Connection String
1. Go back to "Clusters" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `eventgenie`

**Example connection string:**
```
mongodb+srv://eventgenie_user:yourpassword@cluster.mongodb.net/eventgenie?retryWrites=true&w=majority
```

### Step 2: Configure Backend Environment Variables

#### 2.1 Go to Backend Vercel Dashboard
1. Visit: https://vercel.com/asharafshaik420-gmailcoms-projects/eventgenie
2. Click on your backend deployment

#### 2.2 Add Environment Variables
1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

**Variable 1:**
- **Name**: `MONGO_URI`
- **Value**: Your MongoDB Atlas connection string
- **Environment**: Production, Preview, Development

**Variable 2:**
- **Name**: `NODE_ENV`
- **Value**: `production`
- **Environment**: Production, Preview, Development

#### 2.3 Redeploy Backend
```bash
cd server
vercel --prod
```

### Step 3: Configure Frontend Environment Variables

#### 3.1 Go to Frontend Vercel Dashboard
1. Visit: https://vercel.com/asharafshaik420-gmailcoms-projects/eventgenie
2. Look for your frontend deployment

#### 3.2 Update API URL
1. Go to **Settings** → **Environment Variables**
2. Update `VITE_API_BASE_URL`:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `https://eventgenie-osa21t0lf-asharafshaik420-gmailcoms-projects.vercel.app`
   - **Environment**: Production, Preview, Development

#### 3.3 Redeploy Frontend
```bash
cd eventgenie
vercel --prod
```

### Step 4: Test Your Application

#### 4.1 Test Backend API
Visit your backend URL to test:
- **URL**: https://eventgenie-osa21t0lf-asharafshaik420-gmailcoms-projects.vercel.app/
- **Expected**: "EventGenie Backend is Running 🚀"

Test API endpoints:
- **Services**: https://eventgenie-osa21t0lf-asharafshaik420-gmailcoms-projects.vercel.app/api/services
- **Should return**: JSON array of services (may be empty initially)

#### 4.2 Test Frontend
Visit your frontend URL:
- **URL**: https://eventgenie-km1m97pt8-asharafshaik420-gmailcoms-projects.vercel.app
- **Test**: Navigate through pages, try login/register

### Step 5: Initialize Database (Optional)

#### 5.1 Create Admin User
If you want to create an admin user, you can run the initialization script:

1. Create a `.env` file in the server directory:
```bash
MONGO_URI=your_mongodb_atlas_connection_string
NODE_ENV=development
PORT=5001
```

2. Run the admin initialization:
```bash
cd server
npm run init-admin
```

## 🎯 Your Application URLs

### Frontend
**URL**: https://eventgenie-km1m97pt8-asharafshaik420-gmailcoms-projects.vercel.app

### Backend API
**URL**: https://eventgenie-osa21t0lf-asharafshaik420-gmailcoms-projects.vercel.app

## 🔍 Troubleshooting

### Issue 1: Frontend Can't Connect to Backend
**Symptoms**: API calls failing, network errors
**Solution**: 
- Check `VITE_API_BASE_URL` in frontend environment variables
- Ensure backend URL is correct
- Redeploy frontend after updating variables

### Issue 2: Backend Database Connection Failed
**Symptoms**: Backend returns errors, no data
**Solution**:
- Check `MONGO_URI` in backend environment variables
- Verify MongoDB Atlas connection string
- Ensure network access allows connections
- Redeploy backend after updating variables

### Issue 3: CORS Errors
**Symptoms**: Browser console shows CORS errors
**Solution**:
- Backend already includes CORS middleware
- If issues persist, check if frontend URL is allowed

### Issue 4: Environment Variables Not Working
**Symptoms**: Variables not accessible in code
**Solution**:
- Ensure variables are set in Vercel dashboard
- Redeploy after adding variables
- Check variable names match exactly

## 📋 Final Checklist

- [ ] MongoDB Atlas account created
- [ ] Database cluster set up
- [ ] Database user created with proper permissions
- [ ] Network access configured
- [ ] Backend environment variables set (`MONGO_URI`, `NODE_ENV`)
- [ ] Backend redeployed
- [ ] Frontend environment variables updated (`VITE_API_BASE_URL`)
- [ ] Frontend redeployed
- [ ] Backend API tested
- [ ] Frontend application tested
- [ ] Login/Register functionality working
- [ ] Services page loading
- [ ] No console errors

## 🎉 Success!

Once you complete all steps, your EventGenie application will be fully functional with:
- ✅ Frontend deployed and accessible
- ✅ Backend API deployed and connected to database
- ✅ Full authentication system working
- ✅ Service booking functionality
- ✅ Admin panel accessible
- ✅ Vendor dashboard working

## 📞 Support

If you encounter any issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test API endpoints individually
4. Check browser console for errors
5. Ensure MongoDB Atlas is properly configured
