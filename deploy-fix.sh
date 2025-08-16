#!/bin/bash

echo "🚀 EventGenie Deployment Fix Script"
echo "=================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Please install it first:"
    echo "npm install -g vercel"
    exit 1
fi

echo "📦 Step 1: Deploying Backend..."
cd server

# Set environment variables for backend
export MONGO_URI="mongodb+srv://asharafshaik420:Ashu%40123%23%24@eventgenie.rnpdbqn.mongodb.net/eventgenie?retryWrites=true&w=majority&appName=EventGenie"
export NODE_ENV="production"

echo "🔧 Deploying backend to Vercel..."
vercel --prod --yes

# Get the backend URL
BACKEND_URL=$(vercel ls | grep "eventgenie" | head -1 | awk '{print $2}')
echo "✅ Backend deployed at: $BACKEND_URL"

cd ..

echo ""
echo "📦 Step 2: Deploying Frontend..."
cd eventgenie

# Set environment variables for frontend
export VITE_API_BASE_URL="$BACKEND_URL"

echo "🔧 Deploying frontend to Vercel..."
vercel --prod --yes

FRONTEND_URL=$(vercel ls | grep "eventgenie" | tail -1 | awk '{print $2}')
echo "✅ Frontend deployed at: $FRONTEND_URL"

cd ..

echo ""
echo "🎉 Deployment Complete!"
echo "======================"
echo "Backend URL: $BACKEND_URL"
echo "Frontend URL: $FRONTEND_URL"
echo ""
echo "🔍 Testing the fix:"
echo "1. Visit your frontend URL"
echo "2. Try registering a new user"
echo "3. Registration should now work!"
echo ""
echo "📝 If you still have issues:"
echo "- Check Vercel dashboard for environment variables"
echo "- Ensure MongoDB Atlas is accessible"
echo "- Check browser console for any errors"
