const express = require("express");
const router = express.Router();

const { getMe, updateMe } = require("../controller/userController");
const { protect } = require("../controller/authController");
const {
  avatarFileUploader,
  cancellaAvatarFoto
} = require("../controller/file-uploader");

//HOME ROUTE
router
  .route("/me")
  .get(protect, getMe)
  .patch(protect, avatarFileUploader, cancellaAvatarFoto, updateMe);

router.route("/password-forget").get((req, res) => {
  res.status(200).render("blog/password-recover");
});

module.exports = router;
