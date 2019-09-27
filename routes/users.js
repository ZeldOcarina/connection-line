const express = require('express');
const { getAllUsers } = require('../controller/userController');
const {
	signup,
	login,
	protect,
	restrictTo,
	forgotPassword,
	resetPassword,
	updatePassword
} = require('../controller/authController');

const router = express.Router();

router.get('/:language/api/v1/users/', protect, restrictTo('webmaster', 'administrator'), getAllUsers);
router.post('/:language/api/v1/users/signup', signup);
router.post('/:language/api/v1/users/login', login);
router.post('/:language/api/v1/users/forgotPassword', forgotPassword);
router.patch('/:language/api/v1/users/resetPassword/:token', resetPassword);
router.patch('/:language/api/v1/users/updatePassword', protect, updatePassword);

module.exports = router;
