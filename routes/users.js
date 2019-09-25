const express = require('express');
const { getAllUsers } = require('../controller/userController');
const { signup, login } = require('../controller/authController');

const router = express.Router();

router.get('/:language/api/v1/users/', getAllUsers);
router.post('/:language/api/v1/users/signup', signup);
router.post('/:language/api/v1/users/login', login);

module.exports = router;
