const axios = require('axios');

const captchaCheck = async (secret, response) => {
	try {
		const res = await axios.post(
			`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}`
		);
		//console.log(res);
		return res.data.success;
	} catch (err) {
		console.error(err);
		return res
			.status(500)
			.render('error', { title: 'Error!', msg: 'Something with the reCaptcha has gone wrong... 😢' });
	}
};

module.exports = captchaCheck;
