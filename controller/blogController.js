const Post = require('../models/posts');

const { italianContent } = require('../content/content');

exports.blogHome = async (req, res) => {
	const posts = await Post.find();
	res.status(200).render('blogHome', { posts, content: italianContent(), language: 'italian' });
};
