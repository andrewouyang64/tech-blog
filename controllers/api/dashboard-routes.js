const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE POST
router.post('/', withAuth, async (req, res) => {
  try {
    const { post_text } = req.body;
    const postContent = await Post.create({
      user_id: req.session.user_id,
      post_text,
    });
    res.status(200).json(postContent);
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }
});

module.exports = router;