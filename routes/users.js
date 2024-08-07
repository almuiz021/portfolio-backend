const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.param('id', userController.checkUserExists);

router
  .route('/')
  .get(userController.getAllUsers) //
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUserbyName)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

// router.route('/:id').get(userController.getUser);

module.exports = router;
