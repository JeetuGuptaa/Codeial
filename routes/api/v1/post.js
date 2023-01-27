const express = require('express');
const router = express.Router();
const apiPostController = require('../../../controllers/api/v1/post');
router.get('/', apiPostController.post);
router.get('/delete/:id', apiPostController.destroy);
module.exports = router;