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
	const user = await User.findById(this.author);
	user.commentsMade.push(this._id);
	await user.save({ validateBeforeSave: false });
});

commentsSchema.pre(/^find/, function(next) {
	this.populate({
		path: 'author',
		select: 'name avatar _id'
	});
	next();
});

commentsSchema.pre('remove', async function(next) {
	const user = await User.findById(this.author);
	const index = user.commentsMade.indexOf(this._id);
	if (index === -1) next();
	user.commentsMade.splice(index, 1);
	await user.save({ validateBeforeSave: false });
	next();
});

module.exports = mongoose.model('Comment', commentsSchema);
