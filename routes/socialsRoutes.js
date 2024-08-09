const express = require('express');

const router = express.Router();
const socialsController = require('../controllers/socialsController');

router
  .route('/')
  .post(socialsController.addSocials) //
  .patch(socialsController.updateSocials);

module.exports = router;
