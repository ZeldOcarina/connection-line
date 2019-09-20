const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
	name: [
		{
			type: String,
			required: [ true, 'Please insert your name' ]
		}
	],
	email: {
		type: String,
		required: [ true, 'Please insert a valid email address' ],
		unique: true,
		lowercase: true,
		validate: [ validator.isEmail, 'Please provide a valid email' ]
	},
	photo: String,
	password: {
		type: String,
		required: [ true, 'Please set a password' ],
		minlength: 8
	},
	passwordConfirm: {
		type: String,
		required: [ true, 'Please confirm your password' ]
	}
});

module.exports = mongoose.model('User', userSchema);
