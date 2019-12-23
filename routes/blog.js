const express = require('express');
const router = express.Router();

const { blogHome, showBlog } = require('../controller/blogController');

const { italianContent } = require('../content/content');

router.use((req, res, next) => {
	res.locals.content = italianContent();
	res.locals.language = 'italian';
	next();
});

router.get('/', blogHome);
router.get('/:slug', showBlog);

module.exports = router;
