const captchaCheck = require('./captchaCheck');

module.exports = captchaChecker = async (req, res, next) => {
	if (await captchaCheck(process.env.RECAPTCHA_SECRET_KEY, req.body['g-recaptcha-response'])) return next();
	res.status(401).render('error', { title: 'Error!', msg: 'Please try again by selecting the captcha' });
};
