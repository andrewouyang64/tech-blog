const router = require('express').Router();
const { Dashboard } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE POST
router.post('/', withAuth, async (req, res) => {
  try {
    const { post_text, book_id } = req.body;
    const postContent = await Dashboard.create({
      user_id: req.session.user_id,
      comment_text,
      book_id,
    });
    res.status(200).json(postContent);
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }
});

module.exports = router;