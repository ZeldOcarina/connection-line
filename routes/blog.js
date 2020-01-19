const express = require('express');
const router = express.Router();

const { blogHome, showBlog, getPostForm } = require('../controller/blogController');
const { protect } = require('../controller/authController');

const { italianContent } = require('../content/content');

router.use((req, res, next) => {
	res.locals.content = italianContent();
	res.locals.language = 'italian';
	next();
});

router.get('/', blogHome);
router.get('/post', protect, getPostForm);
router.get('/:slug', showBlog);

module.exports = router;
