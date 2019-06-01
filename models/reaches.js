const mongoose = require('mongoose');

const reachesSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: String,
    request: String,
    privacy: Boolean,
    newsletter: Boolean
});

module.exports = mongoose.model('Reach', reachesSchema);

