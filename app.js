const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const expressSanitizer = require('express-sanitizer');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const { getUrl } = require('./controller/getUrl');

let appState = process.env.NODE_ENV === 'production' ? 'production' : 'development';

//INCLUDING PERSONAL MODULES
const limiter = require('./config/security');

require('dotenv').config();

const app = express();
app.use(favicon(path.join(__dirname, 'public', 'assets/favicon.png')));
if (appState === 'production') app.use(helmet());
if (appState === 'production') app.use(limiter);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSanitizer());
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));
app.use(express.json());

//REQUIRING ROUTES
const homeRoute = require('./routes/home');
const messengerBotRoute = require('./routes/messengerBot');
const requestRoute = require('./routes/reach');
const thankyouRoute = require('./routes/thankyou');
const privacyRoute = require('./routes/privacy');
const blogRoute = require('./routes/blog');
const usersRoute = require('./routes/users');

//HOME PAGE
app.use(getUrl, homeRoute);
app.use('/messenger-bot', messengerBotRoute);
app.use(requestRoute);
app.use(thankyouRoute);
app.use(privacyRoute);
app.use(blogRoute);
app.use(usersRoute);

//404
app.all('*', (req, res, next) => {
	next(new AppError('The required page does not exist on this server!', 404));
});

app.use(globalErrorHandler);

exports.app = app;
exports.appState = appState;
