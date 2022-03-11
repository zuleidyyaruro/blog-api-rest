const express = require('express');
const router = express();

// controllers
const usersController=require('../controllers/users.controller');

router.get('/', usersController.getAllUser);
router.get('/:id', usersController.getUserById);
router.post('/', usersController.createNewUser);
// router.patch('/:id', usersController.updateUserPatch);
// router.delete('/:id');

module.exports = router;