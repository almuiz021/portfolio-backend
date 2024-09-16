const express = require('express');
const dataControllers = require('../controllers/dataController');
const authControllers = require('../controllers/authController');

const router = express.Router();

// /api/test/all

router
  .route('/') //
  .get(
    authControllers.protect,
    authControllers.restrictTo('admin'),
    dataControllers.getAllData,
  );

router.route('/:id').get(dataControllers.getAllUserData);
// .get(authControllers.protect, dataControllers.getAllUserData);

module.exports = router;
