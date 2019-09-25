const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [ true, 'Please insert your name' ]
	},
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
		minlength: 8,
		select: false
	},
	passwordConfirm: {
		type: String,
		required: [ true, 'Please confirm your password' ],
		validate: {
			//This only works on create and save, not update
			validator: function(el) {
				return el === this.password;
			},
			message: 'Passwords are not the same!'
		}
	}
});

userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', userSchema);
