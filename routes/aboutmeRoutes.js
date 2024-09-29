const express = require('express');
const aboutmeController = require('../controllers/aboutmeController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router
  .route('/') //
  .get(protect, aboutmeController.getAboutMe)
  .post(protect, aboutmeController.createAboutMe)
  .patch(protect, aboutmeController.updateAboutMe)
  .delete(protect, aboutmeController.deleteAboutMe);

module.exports = router;
