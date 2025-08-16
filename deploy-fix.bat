@echo off
echo 🚀 EventGenie Deployment Fix Script
echo ==================================

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Vercel CLI not found. Please install it first:
    echo npm install -g vercel
    pause
    exit /b 1
)

echo 📦 Step 1: Deploying Backend...
cd server

REM Set environment variables for backend
set MONGO_URI=mongodb+srv://asharafshaik420:Ashu%%40123%%23%%24@eventgenie.rnpdbqn.mongodb.net/eventgenie?retryWrites=true&w=majority&appName=EventGenie
set NODE_ENV=production

echo 🔧 Deploying backend to Vercel...
vercel --prod --yes

echo ✅ Backend deployed!

cd ..

echo.
echo 📦 Step 2: Deploying Frontend...
cd eventgenie

echo 🔧 Deploying frontend to Vercel...
vercel --prod --yes

echo ✅ Frontend deployed!

cd ..

echo.
echo 🎉 Deployment Complete!
echo ======================
echo.
echo 🔍 Testing the fix:
echo 1. Visit your frontend URL from Vercel dashboard
echo 2. Try registering a new user
echo 3. Registration should now work!
echo.
echo 📝 If you still have issues:
echo - Check Vercel dashboard for environment variables
echo - Ensure MongoDB Atlas is accessible
echo - Check browser console for any errors
echo.
pause
