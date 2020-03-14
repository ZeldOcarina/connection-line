const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  showPost,
  createBlog,
  updatePost,
  destroyBlog
} = require("../../controller/apiBlogController");
const {
  postFileUploader,
  multerErrorChecker,
  cancellaBlogFoto
} = require("../../controller/file-uploader");
const {
  postComment,
  editComment,
  deleteComment
} = require("../../controller/commentsController");
const { protect, restrictTo } = require("../../controller/authController");

//HOME ROUTE
router
  .route("/")
  .get(getAllPosts)
  .post(
    protect,
    restrictTo("editor", "administrator", "webmaster"),
    postFileUploader,
    multerErrorChecker,
    createBlog
  );
router
  .route("/comments/:_id")
  .patch(protect, editComment)
  .delete(protect, deleteComment);
router
  .route("/:slug")
  .get(showPost)
  .patch(
    protect,
    restrictTo("editor", "administrator", "webmaster"),
    postFileUploader,
    multerErrorChecker,
    updatePost
  )
  .delete(
    protect,
    restrictTo("editor", "administrator", "webmaster"),
    cancellaBlogFoto,
    destroyBlog
  )
  .post(protect, postComment);

module.exports = router;
