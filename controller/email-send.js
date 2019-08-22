const transporter = require('../controller/nodemailer-setup');
const sanitize = require('sanitize-filename');

module.exports = emailSender = async (req, res, next) => {
	let newsletterMessage;
	const links = req.files.map((file) => file.location);

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
						<p>Il cliente ha caricato questi file:</p>
						${links.map(
							(link) => `
						<p>${link}</p>
						`
						)}
						
                <h3>Ricontattala subito!!</h3>`
		};
		try {
			await transporter.sendMail(message);
		} catch (err) {
			console.error(err);
			res.send('An error has occurred. Please contact the system administrator at connectionlinesagl@gmail.com');
		}
	}
	next();
};