const mongoose = require('mongoose');
const crypto = require('crypto');
const { timeStamp } = require('console');

// user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 64
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
    }
}, {timeStamp: true})

module.exports = mongoose.model('User', userSchema);