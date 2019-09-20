const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	comment: [ String, 'A comment must have some content' ],
	author: String,
	createdAt: Date,
	relatedBlog: String
});

module.exports = mongoose.model('Blog', blogSchema);
