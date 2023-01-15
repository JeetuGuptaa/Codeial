const express = require('express');  //it isn't gonna create a new instance, it will use the previously created instance
const router = express.Router();
const homeController = require('../controllers/home_controller');
router.get('/', homeController.home);

router.use('/user', require('./user'));

module.exports = router;