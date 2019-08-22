const express = require('express');
const router = express.Router();

//REQUIRING MONGO MODEL
const Reach = require('../models/reaches');
const Lead = require('../models/leads');

const requestParser = require('../controller/requestParser');
const mailchimpSubscribe = require('../controller/mailchimpSubscribe');
const fileUploader = require('../controller/file-uploader');
const emailSender = require('../controller/email-send');

router.post('/:language/request', fileUploader, emailSender, (req, res) => {
	const reqBody = req.body;
	//console.log(req.file);
	const privacyResponse = requestParser(reqBody);
	const language = req.params.language;
	//console.log(req.params);
	//console.log(req.url);

	const fileLinks = req.files.map(
		(file) => `https://connectionline.ch/uploads/${reqBody.name}-${file.filename.replace(/ /g, '%20')}`
	);

	const reach = new Reach({
		name: req.sanitize(reqBody.name),
		email: req.sanitize(reqBody.email),
		phoneNumber: req.sanitize(reqBody.phoneNumber),
		request: req.sanitize(reqBody.request),
		files: fileLinks,
		privacy_accepted: privacyResponse.privacy,
		newsletter_accepted: privacyResponse.newsletter
	});

	reach.save((err, reach) => {
		if (err) {
			console.error(err);
			res.send('An error has occurred. Please contact the system administrator.');
		}
		//console.log(reach);
		if (reach.privacy_accepted && reach.newsletter_accepted)
			mailchimpSubscribe(reach.email, reach.name, reach.phoneNumber);
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
		if (err) {
			console.error(err);
			res.send('An error has occurred. Please contact the system administrator.');
		}
		if (lead.newsletter_accepted) {
			mailchimpSubscribe(lead.email, lead.name);

			const message = {
				from: 'connectionlinesagl@gmail.com',
				to: 'connectionlinesagl@gmail.com',
				cc: 'info@connectionlinesagl.com',
				subject: 'Nuova iscrizione alla mailing list!',
				html: `
                <h2>Abbiamo un nuovo iscritto per la nostra mailing list!</h2>
                            <p><strong>Nome:</strong> ${lead.name}</p>
                            <p><strong>Email:</strong> ${lead.email}</p>
                `
			};
			transporter.sendMail(message, (err, info) => {
				if (err) {
					console.error(err);
					res.send('An error has occurred. Please contact the system administrator.');
				}
				//console.log(info);
			});
		}
		res.redirect(`/${language}/thankyou`);
	});
});

module.exports = router;
