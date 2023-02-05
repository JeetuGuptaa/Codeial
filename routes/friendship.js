const express = require('express'); 
const router = express.Router();
const friendshipController = require('../controllers/friendship_controller');

router.get('/toggelFriend',friendshipController.toggleFriendship);
router.get('/remove', friendshipController.remove);
module.exports = router;