const path = require("path");
require("dotenv").config();
const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const expressSanitizer = require("express-sanitizer");
const cors = require("cors");
let reloadify;
if (process.env.NODE_ENV !== "production")
  reloadify = require("reloadify")(__dirname + "/public");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const { isLoggedIn } = require("./controller/authController");

const { getUrl } = require("./controller/getUrl");

let appState =
  process.env.NODE_ENV === "production" ? "production" : "development";

//INCLUDING PERSONAL MODULES
const limiter = require("./config/security");

const app = express();

app.use(morgan(appState === "development" ? "dev" : "combined"));

if (appState !== "production") app.use(reloadify);
app.use(cors());
app.use(favicon(path.join(__dirname, "public", "assets/favicon.png")));
if (appState === "production") app.use(helmet());
if (appState === "production") app.use(limiter);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSanitizer());
app.use("/uploads", express.static("uploads"));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

//GLOBAL TEMPLATES VARIABLES
app.locals.publicKey = process.env.RECAPTCHA_PUBLIC_KEY;

//REQUIRING ROUTES
const homeRoute = require("./routes/home");
const messengerBotRoute = require("./routes/messengerBot");
const requestRoute = require("./routes/reach");
const thankyouRoute = require("./routes/thankyou");
const privacyRoute = require("./routes/privacy");
const blogRoute = require("./routes/blog");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

// API REQUIREMENT
const apiBlogRoute = require("./routes/api/apiBlog");
const usersRoute = require("./routes/api/users");

//TEST MIDDLEWARE
app.use((req, res, next) => {
  next();
});

// SET LOCAL REQUEST VARIABLES
app.locals.tinyAPIKey = process.env.tinyAPIKey;

app.use(isLoggedIn, (req, res, next) => {
  res.locals.page = req.url;
  const firstWordUrl = req.url.split("/")[1];
  res.locals.isNotBlog = firstWordUrl !== "blog" && firstWordUrl !== "user";
  if (!req.user) res.locals.user = null;
  next();
});

//HOME PAGE
app.use(authRoute);

//API ROUTES
app.use("/api/v1/blog/", apiBlogRoute);
app.use("/api/v1/users/", usersRoute);

// VIEW ROUTES
app.use("/blog", blogRoute);
app.use("/user", userRoute);
app.use(getUrl, homeRoute);
app.use(requestRoute);
app.use(thankyouRoute);
app.use(privacyRoute);

//404
app.all("*", (req, res, next) => {
  next(new AppError("The required page does not exist on this server!", 404));
});

app.use(globalErrorHandler);

app.locals.publicKey = process.env.RECAPTCHA_PUBLIC_KEY;

exports.app = app;
exports.appState = appState;
