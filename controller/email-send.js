const aws = require('aws-sdk');
const transporter = require('../controller/nodemailer-setup');

aws.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION
});

const s3 = new aws.S3();

module.exports = emailSender = async (req, res, next) => {
	let newsletterMessage;

	const links = req.files.map((file) =>
		s3.getSignedUrl('getObject', {
			Bucket: process.env.S3_BUCKET,
			Key: file.key, //filename
			Expires: 604800 //time to expire in seconds
		})
	);

	req.body.newsletter_accepted === 'on'
		? (newsletterMessage = 'Si iscrive alla nostra mailing list.')
		: (newsletterMessage = 'Non si iscrive alla mailing list.');
	if (req.body.privacy_accepted === 'on') {
		const message = {
			from: req.body.email,
			to: 'connectionlinesagl@gmail.com',
			//cc: 'info@connectionlinesagl.com',
			subject: 'Una nuova richiesta dal sito!',
			html: `
				<h1>È arrivata una nuova richiesta dal sito!</h1>
							<p><strong>Nome:</strong> ${req.body.name}</p>
							<p><strong>Email:</strong> ${req.body.email}</p>
							<p><strong>Numero di Telefono:</strong> ${req.body.phoneNumber}</p>
							<ul>
							<li>Accetta le normative sulla privacy</li>
							<li>${newsletterMessage}</li>
							</ul>
							<p><strong>Richiesta:</strong></p>
							<p>${req.body.request}</p>
							${links.length > 0
								? `<p>Il cliente ha caricato questi file:</p>
							${links.map(
								(link) => `
							<p>${link}</p>
							`
							)}
							<p>Ricorda che questi link sono validi per una settimana.</p>`
								: ''}
							
					<h3>Ricontattala subito!!</h3>`
		};
		try {
			await transporter.sendMail(message);
		} catch (err) {
			console.error(err);
			res.status(500).render('error', {
				title: 'Error!',
				msg:
					'There has been an error in your request. Would you mind writing us at info@connectionlinesagl.com?'
			});
		}
	}
	next();
};
