const express = require('express');
const router = express.Router();

const { getAllPosts, showPost, createBlog, updatePost, destroyBlog } = require('../controller/blogController');

//HOME ROUTE
router.route('/:language/api/v1/blog').get(getAllPosts).post(createBlog);
router.route('/:language/api/v1/blog/:slug').get(showPost).patch(updatePost).delete(destroyBlog);

module.exports = router;
