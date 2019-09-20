const Post = require('../models/posts');

exports.getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find();

		res.status(200).json({
			status: 'success',
			data: {
				posts
			}
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({
			status: 'error',
			data: err.message
		});
	}
};

exports.createBlog = async (req, res) => {
	try {
		const newPost = await Post.create(req.body);
		console.log(newPost);
		res.status(201).json({
			status: 'success',
			data: {
				post: newPost
			}
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({
			status: 'error',
			data: err.message
		});
	}
};

exports.showPost = async (req, res) => {
	try {
		console.log(req.params);
		const post = await Post.find({ slug: req.params.slug });
		res.status(200).json({
			status: 'success',
			data: {
				post
			}
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({
			status: 'error',
			data: err.message
		});
	}
};

exports.updatePost = async (req, res) => {
	try {
		const post = await Post.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
		res.status(200).json({
			status: 'success',
			data: {
				post
			}
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({
			status: 'error',
			data: err.message
		});
	}
};

exports.destroyBlog = async (req, res) => {
	try {
		await Post.findOneAndDelete({ slug: req.params.slug });
		res.status(204).json({});
	} catch (err) {
		console.error(err);
		res.status(400).json({
			status: 'error',
			data: err.message
		});
	}
};
