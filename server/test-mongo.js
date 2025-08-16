// test-mongo.js - Test MongoDB connection
const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/eventgenie';

console.log('Testing MongoDB connection...');
console.log('MONGO_URI:', MONGO_URI ? 'Set' : 'Not set');

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    console.log('Database:', mongoose.connection.db.databaseName);
    console.log('Host:', mongoose.connection.host);
    console.log('Port:', mongoose.connection.port);
    process.exit(0);
})
.catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.error('Full error:', err);
    process.exit(1);
});

