const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const expressSanitizer = require('express-sanitizer');

let port = process.env.PORT;
let appState = 'production'
if (port == null || port == "") {
    port = 3000;
    appState = 'development'
}

//INCLUDING PERSONAL MODULES
const limiter = require('./controller/security');

require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/connectionLineDB', { useNewUrlParser: true });

const app = express();
if (appState === 'production') app.use(helmet());
if (appState === 'production') app.use(limiter);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
if (appState === 'production') app.use(expressSanitizer());
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//REQUIRING ROUTES
const homeRoute = require("./routes/home");
const requestRoute = require("./routes/reach");
const thankyouRoute = require("./routes/thankyou");
const privacyRoute = require("./routes/privacy");

//HOME PAGE
app.use(homeRoute);
app.use(requestRoute);
app.use(thankyouRoute);
app.use(privacyRoute);

//PORT SETUP
app.listen(port, () => console.log("Server started on port " + port));
