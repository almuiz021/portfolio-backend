const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

router
  .route('/')
  .post(homeController.addHome) //
  .patch(homeController.updateHome);

module.exports = router;
