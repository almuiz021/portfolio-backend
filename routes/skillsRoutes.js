const express = require('express');

const router = express.Router();
const skillsController = require('../controllers/skillsController');
const { protect } = require('../controllers/authController');

router
  .route('/')
  .get(protect, skillsController.getSkills)
  .post(protect, skillsController.createSkills) //
  .patch(protect, skillsController.updateSkills);

router
  .route('/:id') //
  .delete(protect, skillsController.deleteSkills);

module.exports = router;
