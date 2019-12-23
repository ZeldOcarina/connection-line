const express = require('express');
const router = express.Router();

const { getRegister } = require('../controller/authController');

const { italianContent } = require('../content/content');

router.use((req, res, next) => {
	res.locals.content = italianContent();
	res.locals.language = 'italian';
	next();
});

router.get('/register', getRegister);

module.exports = router;
