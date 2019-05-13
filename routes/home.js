const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//REQUIRING MONGO MODEL
const Reach = require("../models/reaches");

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
    res.render('index', {});
});

module.exports = router;

