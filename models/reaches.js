const mongoose = require('mongoose');

const reachesSchema = new mongoose.Schema({
	name: {
		required: [ true, 'An user must have a name!' ],
		type: String
	},
	email: {
		required: [ true, 'An user must have a valid email' ],
		type: String
	},
	phoneNumber: String,
	request: String,
	files: Array,
	privacy_accepted: Boolean,
	newsletter_accepted: Boolean
});

module.exports = mongoose.model('Reach', reachesSchema);
