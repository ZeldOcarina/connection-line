const express = require('express');
const { getAllUsers } = require('../../controller/userController');
const {
	signup,
	login,
	protect,
	restrictTo,
	forgotPassword,
	resetPassword,
	updatePassword
} = require('../../controller/authController');

const router = express.Router();

router.get('/', protect, restrictTo('webmaster', 'administrator'), getAllUsers);
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);
router.patch('/updatePassword', protect, updatePassword);

module.exports = router;
