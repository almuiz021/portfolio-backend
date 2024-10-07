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
  .patch(authController.protect, userController.updateUser)
  .post(authController.protect, userController.createUser)
  .delete(authController.protect, userController.deleteUser);

router
  .route('/:username')
  .get(authController.protect, userController.getUserbyName)
  .patch(authController.protect, userController.updateUser);

// router.route('/:id').get(userController.getUser);

module.exports = router;
