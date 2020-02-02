const catchAsync = require('../utils/catchAsync');

const User = require('../models/users');

exports.getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.find();

	res.status(200).json({
		status: 'success',
		data: {
			users
		}
	});
});

exports.getMe = (req, res) => {
	//console.log(req.user);
	res.status(200).render('me');
};

exports.updateMe = async (req, res) => {
	const avatar = req.file ? req.file.location : '/assets/blog/avatar/avataaars.svg';

	const user = await User.findByIdAndUpdate(req.user._id, { ...req.body, avatar }, { new: true });

	res.status(200).json({
		status: 'success',
		data: user
	});
};
