const express = require('express');

const router = express.Router();
const skillsController = require('../controllers/skillsController');

router
  .route('/')
  .post(skillsController.createSkills) //
  .patch(skillsController.updateSkills);

module.exports = router;
