const express = require('express');
const router = express.Router();

const { blogHome } = require('../controller/blogController');

router.get('/', blogHome);

module.exports = router;
