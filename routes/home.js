const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//REQUIRING MONGO MODEL
const Reach = require("../models/reaches");

//REQUIRING CONTENT
const content = require("../content/content");
const englishContent = content.englishContent();
const frenchContent = content.frenchContent();
const germanContent = content.germanContent();
const italianContent = content.italianContent();

/*const newReach = new Reach({
    name: 'Mattia',
    lastName: 'Rasulo',
    phoneNumber: '091 945 03 32',
    email: 'mattia.rasulo@alice.it',
    request: 'Salve, vorrei che mi traduceste questo documento.'
});
newReach.save(err => { if (!err) return });*/

//HOME ROUTE
router.get("/", (req, res) => {
    res.redirect('/en');
});

router.get('/:language', (req, res) => {
    const language = req.params.language;

    switch (language) {
        case 'it':
            res.render('index', { content: italianContent });
            break;
        case 'en':
            res.render('index', { content: englishContent });
            break;
        case 'de':
            res.render('index', { content: germanContent });
            break;
        case 'fr':
            res.render('index', { content: frenchContent });
            break;
        default:
            res.redirect('/en');
    }
});

module.exports = router;

