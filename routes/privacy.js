const express = require('express');
const router = express.Router();

const languageSelector = require('../utils/language-selector');

//HOME ROUTE
router.get('/', (req, res) => {
	res.redirect('/en');
});

router.get('/:language/privacy', (req, res) => {
	const language = req.params.language;

	const selectedLanguageContent = languageSelector(language);
	res.status(200).render('privacy-' + language, { content: selectedLanguageContent, language: language });
});

module.exports = router;
