const express = require('express');
const router = express.Router();

const { getRegister, getLogin } = require('../controller/authController');

const { italianContent } = require('../content/content');

router.use((req, res, next) => {
	res.locals.content = italianContent();
	res.locals.language = 'italian';
	next();
});

router.get('/register', getRegister);
router.get('/login', getLogin);

module.exports = router;
