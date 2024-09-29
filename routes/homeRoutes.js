const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const { protect } = require('../controllers/authController');

router
  .route('/')
  .get(protect, homeController.getHome)
  .post(protect, homeController.addHome) //
  .patch(protect, homeController.updateHome)
  .delete(protect, homeController.deleteHome);

module.exports = router;
