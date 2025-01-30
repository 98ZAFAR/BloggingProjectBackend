const express = require('express');
const { getAllUserPost, getSinglePost } = require('../controllers/generalController');
const router = express.Router();


router.get('/posts', getAllUserPost);
router.get('/posts/:postId', getSinglePost);

module.exports = router;