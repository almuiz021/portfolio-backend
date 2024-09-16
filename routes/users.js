const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.param('id', userController.checkUserExists);

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'vice-admin'),
    userController.getAllUsers,
  ) //
  .post(authController.protect, userController.createUser);

router
  .route('/:id')
  .get(userController.getUserbyName)
  .patch(authController.protect, userController.updateUser)
  .delete(authController.protect, userController.deleteUser);

// router.route('/:id').get(userController.getUser);

module.exports = router;
