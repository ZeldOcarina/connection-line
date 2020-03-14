const AppError = require("../utils/appError");

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value} Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJwtError = () =>
  new AppError("Invalid token, please log in again.", 401);
handleJwtExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith("/api"))
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });

  res
    .status(err.statusCode)
    .render("error", { title: "An error has occurred!", msg: err.message });
};

const sendErrorProd = (err, req, res) => {
  if (err.isOperational)
    return res.status(400).json({
      status: err.statusCode,
      message: err.message
    });

  console.error("ERROR! 💣", err);
  res.status(500).json({
    status: "error",
    message:
      "Something went wrong, please try again or contact the system administrator"
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (err.statusCode >= 500) console.error(err);
  if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJwtError();
    if (error.name === "TokenExpiredError") error = handleJwtExpiredError();
    sendErrorProd(error, req, res);
  } else sendErrorDev(err, req, res);
};
