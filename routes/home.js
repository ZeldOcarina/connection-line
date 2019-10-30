const express = require('express');
const router = express.Router();

const languageSelector = require('../utils/language-selector');

//HOME ROUTE
router.get('/', (req, res) => {
	res.redirect('/it');
});

router.get('/:language', (req, res) => {
	const language = req.params.language;

	const selectedLanguageContent = languageSelector(language);

	res.status(200).render('index', {
		content: selectedLanguageContent,
		language
		//publicKey: process.env.RECAPTCHA_PUBLIC_KEY
	});
});

module.exports = router;
