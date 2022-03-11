const express = require('express');
const router = express.Router();

// controllers
const postController = require('../controllers/posts.controller');

// endpoints

router.get('/', postController.getAllPost);
router.get('/:id', postController.getPostBy);
router.post('/', postController.createPost);
router.put('/:id', postController.updatedPostPut)
router.patch('/:id', postController.updatedPostPatch);
router.delete('/:id', postController.deletePost);

module.exports = router;
