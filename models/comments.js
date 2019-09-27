const mongoose = require('mongoose');

const User = require('./users');

const commentsSchema = new mongoose.Schema({
	comment: {
		type: String,
		required: [ true, 'A comment must have some content' ]
	},
	author: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	createdAt: Date,
	relatedPost: {
		type: mongoose.Schema.ObjectId,
		ref: 'Post'
	}
});

commentsSchema.pre('save', function(next) {
	this.createdAt = Date.now();
	next();
});

commentsSchema.pre('save', async function() {
	await User.findByIdAndUpdate(this.author, { commentsMade: this._id });
});

commentsSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'author',
		select: 'name -_id'
	});
	next();
});

module.exports = mongoose.model('Comment', commentsSchema);
