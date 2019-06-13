const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/connectionLineDB', { useNewUrlParser: true });

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//REQUIRING ROUTES
const homeRoute = require("./routes/home");
const requestRoute = require("./routes/reach");
const thankyouRoute = require("./routes/thankyou");

//HOME PAGE
app.use(homeRoute);
app.use(requestRoute);
app.use(thankyouRoute);

//REQUEST ROUTE

app.listen(3000, () => console.log("Server started on port 3000"));
