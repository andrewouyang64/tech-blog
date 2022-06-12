const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE COMMENT
router.post('/', withAuth, async (req, res) => {
  try {
    const { comment_text, user_id } = req.body;
    const postComment = await Comment.create({
      user_id: req.session.user_id,
      comment_text,
      post_id,
    });
    res.status(200).json(postComment);
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }
});

module.exports = router;