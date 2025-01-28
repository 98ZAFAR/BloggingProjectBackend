const express = require("express");
const { handleCommentCreate, handleCommentFetch, handleCommentDelete, handleCommentLike } = require("../controllers/commentController");
const router = express.Router();

router.post('/:postId', handleCommentCreate);
router.get('/:postId', handleCommentFetch);
router.delete('/:postId/:commentId', handleCommentDelete);

router.put('/:commentId/likes', handleCommentLike);

module.exports = router;