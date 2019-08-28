const request = require('request');

const mailchimpSubscribe = (email, name, phone) => {
	const dataObj = {
		members: [
			{
				email_address: email,
				status: 'subscribed',
				merge_fields: {
					EMAIL: email,
					NAME: name,
					PHONE: phone
				}
			}
		]
	};

	const data = JSON.stringify(dataObj);

	const options = {
		url: 'https://us20.api.mailchimp.com/3.0/lists/' + process.env.LIST_ID,
		method: 'POST',
		headers: {
			Authorization: 'anyString ' + process.env.MAILCHIMP_KEY
		},
		body: data
	};

	request(options, (err, res, body) => {
		if (err) {
			console.error(err);
			res.status(500).render('error', { title: '500', msg: 'Internal server error. 😢' });
		}
		//console.log(res.statusCode);
	});
};

module.exports = mailchimpSubscribe;
