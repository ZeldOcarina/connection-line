const express = require('express');
const router = express.Router();

const { getAllPosts, showPost, createBlog, updatePost, destroyBlog } = require('../../controller/apiBlogController');
const { postFileUploader, multerErrorChecker, cancellaBlogFoto } = require('../../controller/file-uploader');
const { postComment, editComment, deleteComment } = require('../../controller/commentsController');
const { protect } = require('../../controller/authController');

//HOME ROUTE
router.route('/').get(protect, getAllPosts).post(protect, postFileUploader, multerErrorChecker, createBlog);
router.route('/comments/:_id').patch(protect, editComment).delete(protect, deleteComment);
router
	.route('/:slug')
	.get(showPost)
	.patch(protect, postFileUploader, multerErrorChecker, updatePost)
	.delete(protect, cancellaBlogFoto, destroyBlog)
	.post(protect, postComment);

module.exports = router;
