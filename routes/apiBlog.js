const express = require('express');
const router = express.Router();

const { getAllPosts, showPost, createBlog, updatePost, destroyBlog } = require('../controller/apiBlogController');
const { postComment } = require('../controller/commentsController');
const { protect } = require('../controller/authController');

//HOME ROUTE
router.route('/').get(getAllPosts).post(protect, createBlog);
router.route('/:slug').get(showPost).patch(protect, updatePost).delete(destroyBlog).post(protect, postComment);

module.exports = router;
