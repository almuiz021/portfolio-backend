const express = require('express');
const aboutmeController = require('../controllers/aboutmeController');

const router = express.Router();

router
  .route('/') //
  .get(aboutmeController.getAboutMe)
  .post(aboutmeController.createAboutMe)
  .patch(aboutmeController.updateAboutMe)
  .delete(aboutmeController.deleteAboutMe);

module.exports = router;
