
const express=require('express');
const router=express.Router();

// controller
const commentsController=require('../controllers/comments.controller');

// endpoinst
router.get('/', commentsController.getAllComments);
router.get('/:id', commentsController.getCommentsById);
router.post('/', commentsController.createComments);

module.exports=router;