const router = require('express').Router();
const { Post, Comment, User} = require('../../models');
const withAuth = require('../../utils/auth');

// GET one post
router.get('/:id', async (req, res) => {
    try {
      const dbPostData = await Post.findByPk(req.params.id, {  
        include: [
          User,
          {
            model: Comment,
            include: [User],
          },
        ],
          
      });
      const post = dbPostData.get({ plain: true });
      console.log(post);
      return post  
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  //}
});


// CREATE POST
router.post('/', withAuth, async (req, res) => {
  console.log("message================");
  try {
    const { content, title } = req.body;
    const postContent = await Post.create({
      user_id: req.session.user_id,
      content,
      title
    });
    res.status(200).json(postContent);
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }
});

module.exports = router;