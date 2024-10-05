const express = require('express');

const router = express.Router();

const eduController = require('../controllers/eduController');

const { protect } = require('../controllers/authController');

router
  .route('/')
  .get(protect, eduController.getAllEducations)
  .post(protect, eduController.createEducation) //
  .patch(protect, eduController.updateEducation);

router
  .route('/:id') //
  .delete(protect, eduController.deleteEducation);

module.exports = router;
