const express = require("express");

const app = express();

exports.getUrl = (req, _res, next) => {
  app.locals.url = req.url;
  next();
};
