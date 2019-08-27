const Busboy = require('busboy');
const captchaCheck = require('./captchaCheck');

module.exports = captchaChecker = async (req, res, next) => {
	console.log(req);
	if (await captchaCheck(process.env.RECAPTCHA_SECRET_KEY, req.body['g-recaptcha-response'])) return next();
	res.send('Please try again by selecting the recaptcha');
};
