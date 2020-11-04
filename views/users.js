const express = require('express');

const router = express.Router();

const loginRequired = require('../controllers/loginRequired');
const UsersController = require('../controllers/UsersController');

router.get('/:userId', loginRequired, UsersController.getUser);
router.post('/follow', loginRequired, UsersController.followUser);
router.post('/unfollow', loginRequired, UsersController.unfollowUser);
router.post('/profile-image', loginRequired, UsersController.changeProfileImg);

module.exports = router;
