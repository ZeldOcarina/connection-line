const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const postSchema = new mongoose.Schema({
	title: {
		required: [ true, 'A blog article must have a title' ],
		type: String
	},
	subtitle: String,
	slug: { type: String, slug: 'title', unique: true, slugPaddingSize: 1 },
	content: String,
	createdAt: Date,
	author: [ { type: mongoose.Schema.ObjectId, ref: 'User' } ]
	//comments: [ { type: mongoose.Schema.ObjectId, ref: 'Comment' } ]
});

postSchema.pre('save', function() {
	this.createdAt = Date.now();
});

module.exports = mongoose.model('Post', postSchema);
