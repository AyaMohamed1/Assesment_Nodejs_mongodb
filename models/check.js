const mongoose = require('mongoose');
const checkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },

    protocol: {
        type: String,
        required: true,
    },
    
    owner_email: {
        type: String,
        trim: true,
        required: true,
    },

}, {timeStamp: true})

module.exports = mongoose.model('Check', checkSchema);