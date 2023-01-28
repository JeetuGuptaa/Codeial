const express = require('express');
const router = express.Router();
const apiPostController = require('../../../controllers/api/v1/post');
const passport = require('passport');

router.get('/', apiPostController.post);
router.get('/delete/:id',passport.authenticate('jwt', {session : false}),apiPostController.destroy);
//session: false so that it won't create session
module.exports = router;