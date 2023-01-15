const express = require('express');
const usersController = require('../controllers/users_controller')
const router = express.Router();

router.get('/profile', usersController.profile);
router.post('/data', usersController.data);
router.get('/signup', usersController.signup);

module.exports = router;