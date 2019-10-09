const apiAiClient = require('apiai')(process.env.APIAI_KEY);
const request = require('request');

//HELPER FUNCTIONS
const sendTextMessage = (senderId, text) => {
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages',
		qs: {
			access_token: process.env.FB_ACCESS_TOKEN
		},
		method: 'POST',
		json: {
			recipient: { id: senderId },
			message: { text }
		}
	});
};

const processMessage = (event) => {
	const senderId = event.sender.id;
	const message = event.message.text;
	const apiaiSession = apiAiClient.textRequest(message, { sessionId: 'crowdbotics_bot' });
	apiaiSession.on('response', (response) => {
		const result = response.result.fulfillment.speech;
		sendTextMessage(senderId, result);
	});
	apiaiSession.on('error', (error) => console.log(error));
	apiaiSession.end();
};

//CONTROLLER
exports.verificationController = (req, res) => {
	const hubChallenge = req.query['hub.challenge'];
	const hubMode = req.query['hub.mode'];
	const verifyTokenMatches = req.query['hub.verify_token'] === process.env.BOT_VERIFICATION_STRING;
	if (hubMode && verifyTokenMatches) {
		res.status(200).send(hubChallenge);
	} else {
		res.status(403).end();
	}
};

exports.messageWebhookController = (req, res) => {
	if (req.body.object === 'page') {
		req.body.entry.forEach((entry) => {
			entry.messaging.forEach((event) => {
				if (event.message && event.message.text) {
					processMessage(event);
				}
			});
		});
		res.status(200).end();
	}
};
