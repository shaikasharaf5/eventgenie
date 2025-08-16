# EventGenie Deployment Checklist

## ✅ Issues Fixed

1. **Hardcoded localhost URLs** - Updated all API calls to use environment variables
2. **Missing environment configuration** - Added proper VITE_API_BASE_URL usage
3. **Vercel configuration** - Enhanced vercel.json with proper routing and caching
4. **Build optimization** - Removed unnecessary deploy script from package.json

## 🚀 Quick Deployment Steps

### Step 1: Prepare Environment Variables
Create a `.env.local` file in the `eventgenie/` directory:
```
VITE_API_BASE_URL=https://your-backend-api-url.com
```

### Step 2: Deploy Using Vercel CLI
```bash
# Navigate to frontend directory
cd eventgenie

# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Step 3: Configure Environment Variables in Vercel Dashboard
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add: `VITE_API_BASE_URL` = Your backend API URL
4. Redeploy if needed

## 📋 Pre-Deployment Checklist

- [ ] Backend API is deployed and accessible
- [ ] Environment variables are configured
- [ ] All dependencies are installed (`npm install`)
- [ ] Build passes locally (`npm run build`)
- [ ] No hardcoded localhost URLs in code
- [ ] Vercel CLI is installed and logged in

## 🔧 Files Modified

1. **`src/main.jsx`** - Updated all API calls to use environment variables
2. **`vercel.json`** - Enhanced configuration with proper routing and caching
3. **`package.json`** - Cleaned up scripts
4. **`DEPLOYMENT.md`** - Comprehensive deployment guide
5. **`deploy.sh`** - Linux/Mac deployment script
6. **`deploy.bat`** - Windows deployment script

## 🐛 Common Issues & Solutions

### Build Fails
- Ensure Node.js 18+ is installed
- Run `npm install` to install dependencies
- Check for syntax errors in console

### Environment Variables Not Working
- Verify variables start with `VITE_`
- Set variables in Vercel dashboard
- Redeploy after adding variables

### API Calls Failing
- Check backend API is deployed and accessible
- Verify CORS is configured on backend
- Ensure API URL is correct in environment variables

### Routing Issues
- vercel.json already includes proper rewrites
- Should handle client-side routing correctly

## 📞 Support

If deployment fails:
1. Check Vercel deployment logs
2. Verify all checklist items are completed
3. Test build locally first
4. Check browser console for errors

## 🎯 Success Criteria

Your deployment is successful when:
- [ ] Frontend loads without errors
- [ ] All pages are accessible
- [ ] API calls work correctly
- [ ] Authentication flows work
- [ ] No console errors in browser
