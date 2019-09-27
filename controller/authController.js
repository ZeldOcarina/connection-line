const crypto = require('crypto');

const jwt = require('jsonwebtoken');

const User = require('../models/users');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const transporter = require('../config/nodemailer-setup');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

const loginUser = (userId, statusCode, res) => {
	const token = signToken(userId);
	res.status(statusCode).json({
		status: 'success',
		token
	});
};

exports.signup = catchAsync(async (req, res, next) => {
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm
	});

	loginUser(newUser._id, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;
	// 1) Check if email and password exists
	if (!email || !password) return next(new AppError('Please provide email and password!', 400));

	// 2) Check if User exists && password exists
	const user = await User.findOne({ email }).select('+password');

	if (!user || !await user.correctPassword(password, user.password))
		return next(new AppError('Incorrect email or password', 401));

	// 3) If everything is ok send token to the client
	loginUser(user._id, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
	// 1) Get token and check if it exists
	let token;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
		token = req.headers.authorization.split(' ')[1];
	if (!token) return next(new AppError('You are not logged in! Please log in to get access', 401));
	// 2) Validate the token
	const decoded = await jwt.verify(token, process.env.JWT_SECRET);
	// 3) Check if user exists
	const freshUser = await User.findById(decoded.id);
	if (!freshUser)
		return next(
			new AppError(
				'The user belonging to this token does not exist anymore. Please register or log in again.',
				401
			)
		);
	// 4) Check if user changed password after the jwt was issued
	if (freshUser.changedPasswordAfter(decoded.iat))
		return next(new AppError('User recently changed password. Please log in again.', 401));
	req.user = freshUser;
	next();
});

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		// Roles is an array
		if (!roles.includes(req.user.role))
			return next(new AppError('You do not have permission to perform this action.', 403));
		next();
	};
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
	// 1) Get user based on POSTed email
	const user = await User.findOne({ email: req.body.email });
	if (!user) return next(new AppError('There is no user with that email address', 404));

	// 2) Generate random token
	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });

	// 3) Send it to user's email
	const resetURL = `${req.protocol}://${req.get('host')}/it/api/v1/users/resetPassword/${resetToken}`;

	try {
		await transporter.sendMail({
			from: 'Connection Line Sagl <info@connectionlinesagl.com>',
			to: req.body.email,
			subject: 'Password Reset (valid for 10 minutes)',
			text: `Forgot password? Submit a patch request with your new password and passwordConfirm to. ${resetURL}.\n If you did not forget your password please forget this email`
		});

		res.status(200).json({
			status: 'success',
			message: 'Token sent to email address provided'
		});
	} catch (err) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save({ validateBeforeSave: false });
		return next(new AppError('There was an error sending the email, please try again later', 500));
	}
});

exports.resetPassword = catchAsync(async (req, res, next) => {
	// 1) Get user based on the token
	const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

	const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });

	// 2) If token has not expired and there is a user, set the new password
	if (!user) return next(new AppError('Token is invalid or has expired'), 400);
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();

	// 3) Update changedPasswordAt property for the user

	// 4) Log the user in
	loginUser(user._id, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
	// 1) Get user from the collection
	const loggedUser = req.user;
	const { oldPassword, newPassword, passwordConfirm } = req.body;
	// 2) Check if posted password is correct
	if (!oldPassword || !newPassword) return next(new AppError('Please provide your password and new password!', 400));
	if (!passwordConfirm) return next(new AppError('Please provide a password confirmation field', 400));

	// 2) Check if User exists && password exists
	const user = await User.findOne({ _id: loggedUser._id }).select('+password');

	if (!user || !await user.correctPassword(oldPassword, user.password))
		return next(new AppError('Incorrect email or password', 401));
	// 3) If so, update the password
	user.password = newPassword;
	user.passwordConfirm = passwordConfirm;
	await user.save();
	// 4) Log the user in, send JWT
	loginUser(user._id, 200, res);
});
