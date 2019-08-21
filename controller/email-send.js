const transporter = require('../controller/nodemailer-setup');

module.exports = emailSender = (req, res, next) => {
	let newsletterMessage;
	console.log(req.files);
	const links = req.files.map((file) => `https://connectionline.ch/uploads/${file.filename.replace(/ /g, '%20')}`);

	req.body.newsletter_accepted === 'on'
		? (newsletterMessage = 'Si iscrive alla nostra mailing list.')
		: (newsletterMessage = 'Non si iscrive alla mailing list.');
	if (req.body.privacy_accepted === 'on') {
		const message = {
			from: req.body.email,
			to: 'connectionlinesagl@gmail.com',
			cc: 'info@connectionlinesagl.com',
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
		transporter.sendMail(message, (err, info) => {
			if (err) {
				console.error(err);
				res.send('An error has occurred. Please contact the system administrator.');
			}
			//console.log(info);
		});
	}
	next();
};
