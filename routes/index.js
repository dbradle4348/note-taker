const router = require('express').Router();
const apiRoutes = require('./apiRoutes/apiRoutes');
const htmlRoutes = require('./htmlRoutes/htmlRoutes');

router.use(apiRoutes);
router.use(htmlRoutes);

module.exports = router;
