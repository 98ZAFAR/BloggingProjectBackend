const express = require("express");
const router = express.Router();
const {
  handlePostCreate,
  handlePostFetchAllUser,
  handlePostFetch,
  handlePostEdit,
  handlePostDelete,
  handlePostLike,
} = require("../controllers/postController");

router.get("/", handlePostFetchAllUser);
router.get("/:postId", handlePostFetch);
router.put("/:postId", handlePostEdit);
router.delete("/:postId", handlePostDelete);

router.post("/create", handlePostCreate);

router.put("/:postId/likes", handlePostLike);

module.exports = router;