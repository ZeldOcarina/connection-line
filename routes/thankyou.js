const express = require('express');
const router = express.Router();

//REQUIRING CONTENT
const languageSelector = require('../controller/language-selector')

router.get('/:language/thankyou', (req, res) => {
    const language = req.params.language
    const selectedLanguageContent = languageSelector(language);
    res.render('thankyou', { content: selectedLanguageContent, language: language });
});

module.exports = router;

