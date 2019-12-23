const Post = require('../models/posts');

exports.blogHome = async (req, res) => {
	const posts = await Post.find();
	res.status(200).render('blog/blogHome', { posts });
};

exports.showBlog = async (req, res) => {
	try {
		const { slug } = req.params;
		const post = await Post.findOne({ slug });

		res.status(200).render('blog/showBlog', { post });
	} catch (err) {
		console.error(err);
	}
};
