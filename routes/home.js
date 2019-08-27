const express = require('express');
const router = express.Router();

const languageSelector = require('../controller/language-selector');

//HOME ROUTE
router.get('/', (req, res) => {
	res.redirect('/en');
});

router.get('/:language', (req, res) => {
	const language = req.params.language;

	const selectedLanguageContent = languageSelector(language);

	res.render('index', {
		content: selectedLanguageContent,
		language: language,
		publicKey: process.env.RECAPTCHA_PUBLIC_KEY
	});
});

module.exports = router;
