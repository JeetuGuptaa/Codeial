const express = require('express');  //it isn't gonna create a new instance, it will use the previously created instance
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/user', require('./user'));
router.use('/post', require('./post'));
router.use('/comment', require('./comment'));
router.use('/api', require('./api'));

module.exports = router;