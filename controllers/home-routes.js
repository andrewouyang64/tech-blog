const router = require('express').Router();
const { Post, Comment, User } = require('../models');

// GET all posts for homepage
router.get('/', async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: [
        'id',
        'title',
        'content',
        'user_id',
        'created_at'
      ],
      
      include: [
        //{
          //model: Comment,
          //attributes: ['id', 'title', 'user_id'],
        //},

        {
          model: User,
          attributes: ['id','username'],
        },
        
      ],
    });

    const Posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );

    //console.log('here is posts details.......' + Posts)

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
            attributes: [
              'id',
              'title',
              'content',
              'user_id',
            ],
          },

          {
            //model: Comment,
            //attributes: ['id', 'comment_text', 'user_id', 'post_id'],
            include: {
              model: User,
              attributes: ['username'],
            },
          },
         
        ],
      });
      const post = dbPostData.get({ plain: true });
      res.render('add-comment', { post, loggedIn: req.session.loggedIn });
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
