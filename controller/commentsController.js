const Comment = require('../models/comments');
const Post = require('../models/posts');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.postComment = catchAsync(async (req, res, next) => {
	const post = await Post.findOne({ slug: req.params.slug });
	const request = { ...req.body, author: req.user._id, relatedPost: post._id };

	const comment = await Comment.create(request);
	post.comments.push(comment._id);
	await post.save();

	res.status(201).json({
		status: 'success',
		data: comment
	});
});
