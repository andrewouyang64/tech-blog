const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE COMMENT
router.post('/', withAuth, async (req, res) => {
  console.log("My log ==============")
  try {
    const { comment_text, post_id } = req.body;
    console.log('My log==========' + comment_text);
    console.log('My log==========' +post_id);
    const commentData = await Comment.create({
      user_id: req.session.user_id,
      comment_text,
      post_id,
    });
    console.log(`My new comment is =========${commentData}`)
    res.status(200).json(commentData);
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }
});

//Updating comments
router.put('/:id', withAuth, (req, res) => {
   Comment.update(
     {
       title: req.body.title,
       content: req.body.post_content,
     },
     {
       where: {
         id: req.params.id,
       },
     }
   )
     .then((commentData) => {
       if (!commentData) {
         res.status(404).json({
           message: 'No comment found with this id',
         });
         return;
       }
       res.json(commentData);
     })
     .catch((err) => {
       console.log(err);
       res.status(500).json(err);
     });
 });

// Deleting comments 
 router.delete('/:id', withAuth, (req, res) => {
   Comment.destroy({
     where: {
       id: req.params.id,
     },
   })
     .then((commentData) => {
       if (!commentData) {
         res.status(404).json({
           message: 'No comment found with this id',
         });
         return;
       }
       res.json(commentData);
     })
     .catch((err) => {
       console.log(err);
       res.status(500).json(err);
     });
 });

module.exports = router;