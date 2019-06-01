const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/connectionLineDB', { useNewUrlParser: true });

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//REQUIRING CONTENT
const content = require("./content/content");
const englishContent = content.englishContent();
const frenchContent = content.frenchContent();
const germanContent = content.germanContent();
const italianContent = content.italianContent();

console.log(englishContent, frenchContent, germanContent, italianContent);
//REQUIRING ROUTES
const homeRoute = require("./routes/home");

//HOME PAGE
app.use(homeRoute);

app.listen(3000, () => console.log("Server started on port 3000"));
