const router = require('express').Router();
const userRoutes = require('./User.js');
const postRoutes = require('./Post.js');
const commentRoutes = require('./Comment.js');
//const updateRoutes = require('./update-routes.js');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
//router.use('/updates', updateRoutes);


module.exports = router;
