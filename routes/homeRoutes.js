const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

router
  .route('/')
  .get(homeController.getHome)
  .post(homeController.addHome) //
  .patch(homeController.updateHome)
  .delete(homeController.deleteHome);

module.exports = router;
