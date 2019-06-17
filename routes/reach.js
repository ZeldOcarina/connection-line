const express = require('express');
const router = express.Router();
const expressSanitizer = require('express-sanitizer');

//REQUIRING MONGO MODEL
const Reach = require("../models/reaches");
const Lead = require("../models/leads");

const requestParser = require('../controller/requestParser');
const mailchimpSubscribe = require('../controller/mailchimpSubscribe');

const transporter = require('../controller/nodemailer-setup');

router.post('/:language/request', (req, res) => {
    const reqBody = req.body;
    const privacyResponse = requestParser(reqBody);
    const language = req.params.language;
    //console.log(req.params);
    //console.log(req.url);

    const reach = new Reach({
        name: req.sanitize(reqBody.name),
        email: req.sanitize(reqBody.email),
        phoneNumber: req.sanitize(reqBody.phoneNumber),
        request: req.sanitize(reqBody.request),
        privacy_accepted: privacyResponse.privacy,
        newsletter_accepted: privacyResponse.newsletter
    });

    reach.save((err, reach) => {
        if (err) res.send(err);
        console.log(reach);
        if (reach.privacy_accepted && reach.newsletter_accepted) mailchimpSubscribe(reach.email, reach.name, reach.phoneNumber);
        let newsletterMessage;
        reach.newsletter_accepted ? newsletterMessage = 'Si iscrive alla nostra mailing list.' : newsletterMessage = 'Non si iscrive alla mailing list.';
        if (reach.privacy_accepted) {
            const message = {
            from: 'connectionlinesagl@gmail.com',
            to: 'connectionlinesagl@gmail.com',
            //cc: 'connectionlinesagl@gmail.com',
            subject: 'Una nuova richiesta dal sito!',
            html: `
            <h1>È arrivata una nuova richiesta dal sito!</h1>
                        <p><strong>Nome:</strong> ${reach.name}</p>
                        <p><strong>Email:</strong> ${reach.email}</p>
                        <p><strong>Numero di Telefono:</strong> ${reach.phoneNumber}</p>
                        <ul>
                        <li>Accetta le normative sulla privacy</li>
                        <li>${(newsletterMessage)}</li>
                        </ul>
                        <p><strong>Richiesta:</strong></p>
                        <p>${reach.request}</p>
                <h3>Ricontattala subito!!</h3>`
            }
            transporter.sendMail(message, (err, info) => {
                if (err) console.error(err)
                //console.log(info);
            });
        }
        res.redirect(`/${language}/thankyou`);
    });
});

router.post('/:language/newsletter-subscription', (req, res) => {
    // Handles subscription to the newsletter
    const reqBody = req.body;
    const privacyResponse = requestParser(reqBody);
    const language = req.params.language;
    const lead = new Lead({
        name: req.sanitize(reqBody.name),
        email: req.sanitize(reqBody.email),
        privacy_accepted: privacyResponse.privacy,
        newsletter_accepted: privacyResponse.newsletter
    });

    lead.save((err, lead) => {
        if (err) res.send(err);
        if (lead.newsletter_accepted) {
            mailchimpSubscribe(lead.email, lead.name);
            
            const message = {
                from: 'connectionlinesagl@gmail.com',
                to: 'connectionlinesagl@gmail.com',
                //cc: 'connectionlinesagl@gmail.com',
                subject: 'Nuova iscrizione alla mailing list!',
                html: `
                <h2>Abbiamo un nuovo iscritto per la nostra mailing list!</h2>
                            <p><strong>Nome:</strong> ${lead.name}</p>
                            <p><strong>Email:</strong> ${lead.email}</p>
                `          
                }
                transporter.sendMail(message, (err, info) => {
                    if (err) console.error(err)
                    //console.log(info);
                });
        }
        res.redirect(`/${language}/thankyou`);
    });
});

module.exports = router;