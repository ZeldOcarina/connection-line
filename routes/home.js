const express = require('express');
const router = express.Router();

//REQUIRING CONTENT
const content = require("../content/content");
const englishContent = content.englishContent();
const frenchContent = content.frenchContent();
const germanContent = content.germanContent();
const italianContent = content.italianContent();

const languageSelector = require('../controller/language-selector')

//HOME ROUTE
router.get("/", (req, res) => {
    res.redirect('/en');
});

router.get('/:language', (req, res) => {

    const language = req.params.language;

    const selectedLanguageContent = languageSelector(language);
    res.render('index', { content: selectedLanguageContent, language: language });

});

module.exports = router;

