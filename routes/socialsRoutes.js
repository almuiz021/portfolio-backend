const express = require('express');

const router = express.Router();
const socialsController = require('../controllers/socialsController');
const { protect } = require('../controllers/authController');

router
  .route('/')
  .get(protect, socialsController.getSocials)
  .post(protect, socialsController.addSocials) //
  .patch(protect, socialsController.updateSocials);

router
  .route('/:id') //
  .delete(protect, socialsController.deleteSocial);

module.exports = router;
