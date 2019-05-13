const mongoose = require('mongoose');

const reachesSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    request: String
});

module.exports = mongoose.model('Reach', reachesSchema);

