const express = require('express');

const PostController = require('../controllers/PostController');
const loginRequired = require('../controllers/loginRequired');

const router = express.Router();

router.post('/create', loginRequired, PostController.createPost);
router.get('/my-posts', loginRequired, PostController.getCurrentUserPosts);
router.post('/like', loginRequired, PostController.likePost);
router.post('/unlike', loginRequired, PostController.unlikePost);
router.post('/comment', loginRequired, PostController.addComment);
router.delete('/:postId', loginRequired, PostController.deletePost);
router.get('/all', PostController.getAllPosts);
router.get('/subposts', loginRequired, PostController.getSubPosts);

module.exports = router;
