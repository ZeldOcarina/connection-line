const content = require("../content/content");
const englishContent = content.englishContent();
const frenchContent = content.frenchContent();
const germanContent = content.germanContent();
const italianContent = content.italianContent();

const languageSelector = function (language) {

    switch (language) {
        case 'it':
            return italianContent;
        case 'en':
            return englishContent;
        case 'de':
            return germanContent;
        case 'fr':
            return frenchContent;
        default:
            return italianContent;
    }
}

module.exports = languageSelector;