const router = require('express').Router();
const userRoute = require('./userRoute');
const postRoute = require('./postRoute');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoute);
router.use('/blogs', postRoute);
router.use('/comments', commentRoutes);

module.exports = router;