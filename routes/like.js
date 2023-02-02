const express = require('express');  //it isn't gonna create a new instance, it will use the previously created instance
const router = express.Router();
const likesController = require('../controllers/likes_controller');
const passport = require('passport');

router.get('/toggleLike', passport.checkAuthentication, likesController.toggleLike);


module.exports = router;