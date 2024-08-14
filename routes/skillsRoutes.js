const express = require('express');

const router = express.Router();
const skillsController = require('../controllers/skillsController');

router
  .route('/')
  .post(skillsController.createSkills) //
  .patch(skillsController.updateSkills);

router
  .route('/:id') //
  .delete(skillsController.deleteSkills);

module.exports = router;
