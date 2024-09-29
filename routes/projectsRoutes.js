const express = require('express');

const router = express.Router();
const projectsController = require('../controllers/projectsController');
const { protect } = require('../controllers/authController');

router
  .route('/') //
  .post(protect, projectsController.createProjects)
  .patch(protect, projectsController.updateProjects)
  .get(protect, projectsController.getAllProjects);

router
  .route('/:id') //
  .get(protect, projectsController.getProject)
  .delete(protect, projectsController.deleteProject);

module.exports = router;
