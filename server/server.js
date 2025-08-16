const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Check MongoDB URI
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/eventgenie';

if (!process.env.MONGO_URI) {
    console.warn('⚠️ WARNING: No MONGO_URI found in environment variables. Falling back to local MongoDB.');
}

// MongoDB Connection
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log(`✅ MongoDB Connected: ${MONGO_URI.includes('localhost') ? 'Local DB' : 'Remote Cluster'}`))
.catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/vendors', require('./routes/vendorRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Root route
app.get('/', (req, res) => {
    res.send('EventGenie Backend is Running 🚀');
});

// Export app (useful for testing / serverless)
module.exports = app;

// Start server (both dev & production, but skip in tests)
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}
