const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    businessName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        default: ''
    },
    about: {
        type: String,
        default: ''
    },
    categories: [{
        type: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Vendor', vendorSchema); 