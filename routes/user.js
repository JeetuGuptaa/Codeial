const express = require('express');
const usersController = require('../controllers/users_controller')
const router = express.Router();

router.get('/profile', usersController.profile);
router.post('/data', usersController.data);
router.get('/signup', usersController.signup);
router.get('/signin', usersController.signin);
router.post('/create', usersController.create);
module.exports = router;