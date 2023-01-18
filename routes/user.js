const express = require('express');
const passport = require('passport');
const usersController = require('../controllers/users_controller')
const router = express.Router();

//passport.checkAuthentication middleware will check f teh user is signedin or not,
//if not then it won't allow user to access profile page and redirect to sign in page
router.get('/profile',passport.checkAuthentication, usersController.profile);
router.post('/data', usersController.data);
router.get('/signup',passport.checkIfSignedIn, usersController.signup);
router.get('/signin',passport.checkIfSignedIn, usersController.signin);
router.post('/create', usersController.create);
router.get('/signout', usersController.signout);

router.post('/create-session', passport.authenticate(
    'local', //we are using local strategy
    {failureRedirect:"/user/signin"}
), usersController.createSession);

module.exports = router;