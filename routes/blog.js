const express = require("express");
const router = express.Router();

const {
  blogHome,
  showBlog,
  getPostForm,
  getEditBlog
} = require("../controller/blogController");
const { protect, restrictTo } = require("../controller/authController");

const { italianContent } = require("../content/content");

/*router.use((req, res, next) => {
  res.locals.content = italianContent();
  res.locals.language = "italian";
  next();
});*/

router.get("/", blogHome);
router.get(
  "/post",
  protect,
  restrictTo("editor", "administrator", "webmaster"),
  getPostForm
);
router.get(
  "/:slug/edit",
  restrictTo("editor", "administrator", "webmaster"),
  protect,
  getEditBlog
);
router.get("/:slug", showBlog);

module.exports = router;
