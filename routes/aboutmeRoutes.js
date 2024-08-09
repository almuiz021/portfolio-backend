const express = require('express');
const aboutmeController = require('../controllers/aboutmeController');

const router = express.Router();

router
  .route('/') //
  .post(aboutmeController.createAboutMe)
  .patch(aboutmeController.updateAboutMe);

module.exports = router;
