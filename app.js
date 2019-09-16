const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const expressSanitizer = require('express-sanitizer');

const { getUrl } = require('./controller/getUrl');

process.on('uncaughtException', (err) => {
	console.error(err.name, err.message);
	console.log('Uncaught Exception, shutting down');
	process.exit(1);
});

let port = process.env.PORT;
let appState = 'production';
if (port == null || port == '') {
	port = 3000;
	appState = 'development';
}

//INCLUDING PERSONAL MODULES
const limiter = require('./controller/security');

require('dotenv').config();

if (appState === 'development')
	mongoose.connect('mongodb://localhost:27017/connectionLineDB', { useNewUrlParser: true });
else if (appState === 'production')
	mongoose.connect(
		'mongodb+srv://admin-mattia:' + process.env.MONGO_PWD + '@connection-line-fzqvp.mongodb.net/connectionLineDB',
		{ useNewUrlParser: true }
	);

const app = express();
app.use(favicon(path.join(__dirname, 'public', 'assets/favicon.png')));
if (appState === 'production') app.use(helmet());
if (appState === 'production') app.use(limiter);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSanitizer());
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//REQUIRING ROUTES
const homeRoute = require('./routes/home');
const requestRoute = require('./routes/reach');
const thankyouRoute = require('./routes/thankyou');
const privacyRoute = require('./routes/privacy');

//HOME PAGE
app.use(getUrl, homeRoute);
app.use(requestRoute);
app.use(thankyouRoute);
app.use(privacyRoute);

app.all('*', (req, res, next) => {
	res.status(404).render('error', { title: '404', msg: 'The required page does not exist on this server!' });
});

//PORT SETUP
const server = app.listen(port, () => console.log('Server started on port ' + port));

process.on('unhandledRejection', (err) => {
	console.log(err.name, err.message);
	console.log('Unhandled rejection, shutting down');
	server.close(() => {
		process.exit(1);
	});
});

process.on('SIGTERM', () => {
	console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
	server.close(() => {
		console.log('💥 Process terminated!');
	});
});
