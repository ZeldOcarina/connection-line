const mongoose = require('mongoose');

const leadsSchema = new mongoose.Schema({
    name: String,
    email: String,
    privacy_accepted: Boolean,
    newsletter_accepted: Boolean
});

module.exports = mongoose.model('Lead', leadsSchema);

