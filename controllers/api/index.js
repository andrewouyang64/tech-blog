const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const dashBoardRoutes = require('./dashboard-routes.js');
const commentRoutes = require('./comment-routes.js');
//const updateRoutes = require('./update-routes.js');

router.use('/users', userRoutes);
router.use('/posts', dashBoardRoutes);
router.use('/comments', commentRoutes);
//router.use('/updates', updateRoutes);


module.exports = router;
