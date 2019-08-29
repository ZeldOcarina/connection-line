const express = require('express');
const router = express.Router();

//REQUIRING MONGO MODEL
const Reach = require('../models/reaches');
const Lead = require('../models/leads');

const requestParser = require('../controller/requestParser');
const mailchimpSubscribe = require('../controller/mailchimpSubscribe');
const { fileUploader, multerErrorChecker } = require('../controller/file-uploader');
const emailSender = require('../controller/email-send');
const captchaChecker = require('../controller/captchaChecker');
const transporter = require('../controller/nodemailer-setup');

router.post('/:language/request', fileUploader, captchaChecker, multerErrorChecker, emailSender, (req, res) => {
	const reqBody = req.body;

	//console.log(req.file);
	const privacyResponse = requestParser(reqBody);
	const language = req.params.language;
	//console.log(req.params);
	//console.log(req.url);

	//if (await captchaCheck(process.env.RECAPTCHA_SECRET_KEY, req.body['g-recaptcha-response'])) {
	const fileLinks = req.files.map((file) => file.location);

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
			res.status(500).render('error', { title: '500', msg: 'Server error! 😢' });
		}
		//console.log(reach);
		if (reach.privacy_accepted && reach.newsletter_accepted)
			mailchimpSubscribe(reach.email, reach.name, reach.phoneNumber);
		res.status(201).redirect(`/${language}/thankyou`);
	});
	/*} else {
		res.send(
			'An error has occurred on processing your request. Please contact us manually at info@connectionlinesagl.com'
		);
	}*/
});

router.post('/:language/newsletter-subscription', captchaChecker, (req, res) => {
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
			res.status(500).render('error', { title: '500', msg: 'Server error! 😢' });
		}
		if (lead.newsletter_accepted) {
			mailchimpSubscribe(lead.email, lead.name);

			const message = {
				from: 'connectionlinesagl@gmail.com',
				to: 'connectionlinesagl@gmail.com',
				//cc: 'info@connectionlinesagl.com',
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
					res.status(500).render('error', { title: '500', msg: 'Server error! 😢' });
				}
				//console.log(info);
			});
		}
		res.redirect(`/${language}/thankyou-lead`);
	});
});

module.exports = router;
