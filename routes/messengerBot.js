const express = require('express');
const router = express.Router();

const { verificationController, messageWebhookController } = require('../controller/messengerBotController');

//HOME ROUTE
router.route('/').get(verificationController).post(messageWebhookController);

module.exports = router;
