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
	}
};

module.exports = captchaCheck;
