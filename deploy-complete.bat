@echo off
echo ==========================================
echo EventGenie Complete Deployment Script
echo ==========================================
echo.

REM Check if Vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI not found. Please install it first:
    echo npm install -g vercel
    pause
    exit /b 1
)

echo ✅ Vercel CLI found
echo.

echo 📦 Step 1: Deploying Backend with Environment Variables...
cd server

REM Set environment variables for backend deployment
set MONGO_URI=mongodb+srv://asharafshaik420:Ashu%%40123%%23%%24@eventgenie.rnpdbqn.mongodb.net/eventgenie?retryWrites=true&w=majority&appName=EventGenie
set NODE_ENV=production

echo Deploying backend with MongoDB URI...
vercel --prod --yes --env MONGO_URI="%MONGO_URI%" --env NODE_ENV="%NODE_ENV%"

REM Get the backend URL from the deployment
for /f "tokens=*" %%i in ('vercel ls ^| findstr "Ready" ^| head -1') do set BACKEND_URL=%%i
set BACKEND_URL=%BACKEND_URL: =%

echo.
echo 📦 Step 2: Deploying Frontend...
cd ..\eventgenie

REM Set environment variable for frontend
set VITE_API_BASE_URL=%BACKEND_URL%

echo Deploying frontend with API URL: %VITE_API_BASE_URL%
vercel --prod --yes --env VITE_API_BASE_URL="%VITE_API_BASE_URL%"

cd ..

echo.
echo ==========================================
echo 🎉 Deployment Complete!
echo ==========================================
echo.
echo Backend URL: %BACKEND_URL%
echo Frontend URL: Check Vercel dashboard for the latest deployment
echo.
echo Please test the registration functionality now.
pause
