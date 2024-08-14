const express = require('express');

const router = express.Router();
const projectsController = require('../controllers/projectsController');

router
  .route('/') //
  .post(projectsController.createProjects)
  .patch(projectsController.updateProjects)
  .get(projectsController.getAllProjects);

router
  .route('/:id') //
  .get(projectsController.getProject)
  .delete(projectsController.deleteProject);

module.exports = router;
