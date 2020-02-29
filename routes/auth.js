const express = require("express");
const router = express.Router();

const {
  getRegister,
  getLogin,
  logout,
  protect
} = require("../controller/authController");

const { italianContent } = require("../content/content");

router.use((req, res, next) => {
  res.locals.content = italianContent();
  res.locals.language = "italian";
  next();
});

router.get("/register", protect, getRegister);
router.get("/login", getLogin);
router.get("/logout", logout);

module.exports = router;
