const router = require('express').Router();
const { Post, Dashboard } = require('../models');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [
        {
          model: content,
          attributes: ['filename', 'description'],
        },
      ],
    });

    const Posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );

    res.render('homepage', {
      Posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
router.get('/post/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view post
    try {
      const dbPostData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: content,
            attributes: [
              'id',
              'title',
              'comment',
              'user_id',
            ],
          },
        ],
      });
      const post = dbPostData.get({ plain: true });
      res.render('post-content', { postContent, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});



router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
