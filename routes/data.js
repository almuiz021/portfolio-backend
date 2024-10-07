const express = require('express');
const dataControllers = require('../controllers/dataController');
const authControllers = require('../controllers/authController');
const { checkUserExists } = require('../controllers/userController');

const router = express.Router();

// /api/test/all

router
  .route('/') //
  .get(
    authControllers.protect,
    authControllers.restrictTo('admin'),
    dataControllers.getAllData,
  );

router
  .route('/hosting') // User No
  .patch(authControllers.protect, dataControllers.updateHosting)
  .get(authControllers.protect, dataControllers.getHosting);

router
  .route('/:username') // userName
  .get(dataControllers.getAllUserDataByUserName);
// .get(authControllers.protect, dataControllers.getAllUserData);

module.exports = router;
