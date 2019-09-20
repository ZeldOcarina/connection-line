const express = require('express');
const router = express.Router();

//REQUIRING CONTENT
const languageSelector = require('../utils/language-selector');

router.use((req, res, next) => {
	const language = req.params.language;
	req.selectedLanguageContent = languageSelector(language);
	next();
});

router.get('/:language/thankyou', (req, res) => {
	res
		.status(200)
		.render('thankyou', { content: req.selectedLanguageContent, language: req.params.language, url: req.url });
});

router.get('/:language/thankyou-lead', (req, res) => {
	res
		.status(200)
		.render('thankyou-lead', { content: req.selectedLanguageContent, language: req.params.language, url: req.url });
});

module.exports = router;
