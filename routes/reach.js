const express = require('express');
const router = express.Router();
const request = require('request');

//REQUIRING MONGO MODEL
const Reach = require("../models/reaches");
const Lead = require("../models/leads");

const requestParser = require('../controller/requestParser');
const mailchimpSubscribe = require('../controller/mailchimpSubscribe');

router.post('/:language/request', (req, res) => {
    const reqBody = req.body;
    const privacyResponse = requestParser(reqBody);
    const language = req.params.language;
    console.log(req.params);
    console.log(req.url);

    const reach = new Reach({
        name: reqBody.name,
        email: reqBody.email,
        phoneNumber: reqBody.phoneNumber,
        request: reqBody.request,
        privacy_accepted: privacyResponse.privacy,
        newsletter_accepted: privacyResponse.newsletter
    });

    reach.save((err, reach) => {
        if (err) res.send(err);
        if (reach.privacy_accepted && reach.newsletter_accepted) mailchimpSubscribe(reach.email, reach.name, reach.phoneNumber);
        res.redirect(`/${language}/thankyou`);
    });
});

router.post('/:language/newsletter-subscription', (req, res) => {
    // Handles subscription to the newsletter
    const reqBody = req.body;
    const privacyResponse = requestParser(reqBody);
    const language = req.params.language;
    const lead = new Lead({
        name: reqBody.name,
        email: reqBody.email,
        privacy_accepted: privacyResponse.privacy,
        newsletter_accepted: privacyResponse.newsletter
    });

    lead.save((err, lead) => {
        if (err) res.send(err);
        if (lead.newsletter_accepted) mailchimpSubscribe(lead.email, lead.name);
        res.redirect(`/${language}/thankyou`);
    });
});

module.exports = router;