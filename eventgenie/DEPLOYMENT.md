# EventGenie Frontend Deployment Guide

## Prerequisites
- Node.js 18+ installed
- Vercel CLI installed (`npm i -g vercel`)
- Your backend API deployed and accessible

## Step 1: Prepare Your Environment Variables

### Option A: Using Vercel Dashboard (Recommended)
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following environment variable:
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: Your backend API URL (e.g., `https://your-backend-api.vercel.app` or `https://your-backend-api.herokuapp.com`)
   - **Environment**: Production, Preview, Development

### Option B: Using Vercel CLI
1. Create a `.env.local` file in your project root:
```bash
VITE_API_BASE_URL=https://your-backend-api-url.com
```

## Step 2: Deploy to Vercel

### Method 1: Using Vercel CLI (Recommended)
1. Open terminal in your project directory (`eventgenie/`)
2. Run the following commands:
```bash
# Install dependencies
npm install

# Login to Vercel (if not already logged in)
vercel login

# Deploy to Vercel
vercel

# Follow the prompts:
# - Set up and deploy? → Yes
# - Which scope? → Select your account
# - Link to existing project? → No
# - Project name? → eventgenie-frontend (or your preferred name)
# - Directory? → ./ (current directory)
# - Override settings? → No
```

### Method 2: Using GitHub Integration
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `eventgenie` (if your frontend is in a subdirectory)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add environment variables in the dashboard
7. Click "Deploy"

## Step 3: Configure Environment Variables in Vercel Dashboard

After deployment, make sure to set your environment variables:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add:
   - `VITE_API_BASE_URL` = Your backend API URL
4. Redeploy if needed

## Step 4: Verify Deployment

1. Check your deployment URL (provided by Vercel)
2. Test the following functionality:
   - Home page loads
   - Services page loads
   - Login/Register forms work
   - API calls are successful

## Troubleshooting Common Issues

### Issue 1: Build Fails
**Error**: Build command failed
**Solution**: 
- Check if all dependencies are in `package.json`
- Ensure Node.js version is 18+
- Check for syntax errors in your code

### Issue 2: Environment Variables Not Working
**Error**: API calls failing with localhost URLs
**Solution**:
- Verify environment variables are set in Vercel dashboard
- Check that variable names start with `VITE_`
- Redeploy after adding environment variables

### Issue 3: Routing Issues
**Error**: 404 errors on page refresh
**Solution**:
- The `vercel.json` file already includes proper rewrites
- This should handle client-side routing correctly

### Issue 4: CORS Errors
**Error**: CORS policy blocking requests
**Solution**:
- Ensure your backend API allows requests from your Vercel domain
- Add your Vercel URL to your backend's CORS configuration

## Production Checklist

- [ ] Environment variables configured
- [ ] Backend API deployed and accessible
- [ ] All API endpoints working
- [ ] Authentication flows working
- [ ] Responsive design tested
- [ ] Performance optimized
- [ ] Error handling implemented

## Custom Domain (Optional)

1. Go to your Vercel project dashboard
2. Navigate to Settings → Domains
3. Add your custom domain
4. Configure DNS settings as instructed

## Monitoring and Analytics

- Vercel provides built-in analytics
- Monitor your deployment in the Vercel dashboard
- Set up error tracking if needed

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test locally with production environment variables
4. Check browser console for errors
