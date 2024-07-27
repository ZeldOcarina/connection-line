const mongoose = require('mongoose');
const checkIfSpam = require("../utils/checkIfSpam");
const {
	blacklistEmails,
} = require("../utils/blacklistWords");

const reachesSchema = new mongoose.Schema({
	name: {
		required: [true, 'An user must have a name!'],
		type: String
	},
	email: {
		required: [true, 'An user must have a valid email'],
		type: String,
		validator: function (v) {
			return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) &&
				!v.endsWith("@connectionline.ch") && !blacklistEmails.some((word) => v.toLowerCase().includes(word)));
		}
	},
	phoneNumber: String,
	request: {
		type: String,
		required: true,
		validate: {
			validator: async function (v) {
				if (!v) return false
				const isSpam = await checkIfSpam(v);

				return !isSpam
			},
			message:
				"La tua richiesta sembra essere spam.",
		},
	},
	files: Array,
	privacy_accepted: Boolean,
	newsletter_accepted: Boolean
});

module.exports = mongoose.model('Reach', reachesSchema);
