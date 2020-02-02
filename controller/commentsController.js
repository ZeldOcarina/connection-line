const Comment = require('../models/comments');
const Post = require('../models/posts');

const catchAsync = require('../utils/catchAsync');

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

exports.editComment = async (req, res) => {
	try {
		const { _id } = req.params;
		const { comment } = req.body;

		const oldComment = await Comment.findById(_id);
		if (JSON.stringify(req.user._id) !== JSON.stringify(oldComment.author._id))
			throw new Error("I commenti possono essere modificati solo dall'autore originale degli stessi");

		const newComment = await Comment.findByIdAndUpdate(_id, { $set: { comment } }, { new: true });

		res.status(200).json({
			status: 'success',
			data: newComment
		});
	} catch (err) {
		res.status(400).json({
			status: 'error',
			data: err.message
		});
	}
};

exports.deleteComment = async (req, res) => {
	try {
		const { _id } = req.params;
		const comment = await Comment.findById(_id);
		await comment.remove();

		res.status(204).json({
			status: 'success',
			data: ''
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			status: 'error',
			data: err.message
		});
	}
};
