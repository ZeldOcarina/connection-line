const Post = require('../models/posts');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllPosts = catchAsync(async (req, res, next) => {
	const posts = await Post.find();

	res.status(200).json({
		status: 'success',
		data: {
			posts
		}
	});
});

exports.createBlog = catchAsync(async (req, res, next) => {
	req.body.author = req.user._id;
	const newPost = await Post.create({
		...req.body,
		image: req.file ? req.file.location : '/assets/blog/default-picture/default-picture.jpg'
	});
	res.status(201).json({
		status: 'success',
		data: {
			post: newPost
		}
	});
});

exports.showPost = catchAsync(async (req, res, next) => {
	const post = await Post.find({ slug: req.params.slug });

	if (post.length === 0) return next(new AppError('No post found', 404));

	res.status(200).json({
		status: 'success',
		data: {
			post
		}
	});
});

exports.updatePost = catchAsync(async (req, res, next) => {
	const user = req.user._id;
	const post = await Post.findOneAndUpdate(
		{ slug: req.params.slug, author: user },
		{ ...req.body, image: req.file ? req.file.location : req.body['post-image'] },
		{ new: true }
	);
	if (!post) return next(new AppError("You cannot update someone else's post", 401));
	res.status(200).json({
		status: 'success',
		data: {
			post
		}
	});
});

exports.destroyBlog = catchAsync(async (req, res, next) => {
	const post = await Post.findOneAndDelete({ slug: req.params.slug });
	if (!post) return next(new AppError('No post found', 404));
	res.status(204).json({});
});
