const express = require("express");
const router = express.Router();

const languageSelector = require("../utils/language-selector");

//HOME ROUTE
router.get("/", (req, res) => {
  res.redirect("/it");
});

router.get("/:language", (req, res) => {
  const language = req.params.language;

  const selectedLanguageContent = languageSelector(language);

  res.status(200).render("index", {
    content: selectedLanguageContent,
    language,
  });
});

router.get("/:language/seo", (req, res) => {
  const language = req.params.language;

  const selectedLanguageContent = languageSelector(language);

  return res
    .status(200)
    .render("seo", { content: selectedLanguageContent, language });
});

module.exports = router;
