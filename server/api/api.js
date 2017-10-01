var router = require('express').Router();

// api router will mount other routers
// for all our resources
router.use('/categories', require('./category/categoryRoutes'));
router.use('/places', require('./place/placeRoutes'));
router.use('/events', require('./event/eventRoutes'));
router.use('/users', require('./user/userRoutes'));
router.use('/comments', require('./comment/commentRoutes'));

module.exports = router;
