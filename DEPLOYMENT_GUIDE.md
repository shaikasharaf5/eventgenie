# EventGenie Deployment Guide

## Option 1: Automated Deployment (Recommended)

### Step 1: Run the Automated Script
```bash
# Windows
.\deploy-complete.bat

# Linux/Mac
chmod +x deploy-complete.sh
./deploy-complete.sh
```

## Option 2: Manual Vercel Deployment

### Backend Deployment
1. Navigate to `server` directory
2. Run: `vercel --prod --yes`
3. Set environment variables in Vercel dashboard:
   - `MONGO_URI`: `mongodb+srv://asharafshaik420:Ashu%40123%23%24@eventgenie.rnpdbqn.mongodb.net/eventgenie?retryWrites=true&w=majority&appName=EventGenie`
   - `NODE_ENV`: `production`

### Frontend Deployment
1. Navigate to `eventgenie` directory
2. Set environment variable: `VITE_API_BASE_URL` to your backend URL
3. Run: `vercel --prod --yes`

## Option 3: Alternative Deployment (Netlify + Vercel)

### Backend (Vercel)
1. Deploy backend using Option 2
2. Note the backend URL

### Frontend (Netlify)
1. Push code to GitHub
2. Connect Netlify to your GitHub repository
3. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variable: `VITE_API_BASE_URL` = your backend URL

## Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb+srv://asharafshaik420:Ashu%40123%23%24@eventgenie.rnpdbqn.mongodb.net/eventgenie?retryWrites=true&w=majority&appName=EventGenie
NODE_ENV=production
```

### Frontend (.env)
```
VITE_API_BASE_URL=https://your-backend-url.vercel.app
```

## Troubleshooting

### Registration Not Working
1. Check browser console for errors
2. Verify backend URL is correct
3. Ensure MongoDB connection is working
4. Check CORS settings

### Common Issues
- **401 Errors**: Backend authentication issue - check Vercel settings
- **CORS Errors**: Backend CORS configuration
- **Build Failures**: Check Node.js version and dependencies

## Testing
1. Open your deployed frontend URL
2. Try to register a new user
3. Check if the registration form submits successfully
4. Verify user appears in MongoDB database
