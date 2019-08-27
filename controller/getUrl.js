const express = require('express');

const app = express();

exports.getUrl = (req, res, next) => {
	app.locals.url = req.url;
	next();
};
