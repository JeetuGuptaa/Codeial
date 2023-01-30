const express = require('express');
const passport = require('passport');
const usersController = require('../controllers/users_controller')
const router = express.Router();

//passport.checkAuthentication middleware will check f teh user is signedin or not,
//if not then it won't allow user to access profile page and redirect to sign in page
router.get('/profile/:id',passport.checkAuthentication, usersController.profile);
router.post('/data', usersController.data);
router.get('/signup',passport.checkIfSignedIn, usersController.signup);
router.get('/signin',passport.checkIfSignedIn, usersController.signin);
router.post('/create', usersController.create);
router.get('/signout', usersController.signout);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.post('/create-session', passport.authenticate(
    'local', //we are using local strategy
    {failureRedirect:"/user/signin"}
), usersController.createSession);

router.get('/auth/google', passport.authenticate('google', {'scope': ['profile', 'email']}));//this url is given by passport
router.get('/auth/google/callback', passport.authenticate('google',//our callback uri
{
    failureRedirect: "/user/signin"
}), usersController.createSession);

module.exports = router;