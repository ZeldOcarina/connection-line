const express = require('express');
const router = express.Router();

const { getAllPosts, showPost, createBlog, updatePost, destroyBlog } = require('../../controller/apiBlogController');
const { postFileUploader, multerErrorChecker } = require('../../controller/file-uploader');
const { postComment } = require('../../controller/commentsController');
const { protect } = require('../../controller/authController');

//HOME ROUTE
router.route('/').get(protect, getAllPosts).post(protect, postFileUploader, multerErrorChecker, createBlog);
router.route('/:slug').get(showPost).patch(protect, updatePost).delete(destroyBlog).post(protect, postComment);

module.exports = router;
