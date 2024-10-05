const express = require('express');

const router = express.Router();
const projectsController = require('../controllers/projectsController');
const { protect } = require('../controllers/authController');
const { deleteTechUsed } = require('../controllers/techusedController');

router
  .route('/') //
  .post(protect, projectsController.createProjects)
  .patch(protect, projectsController.update_createProjects)
  .get(protect, projectsController.getAllProjects);

router
  .route('/:id') //
  .get(protect, projectsController.getProject)
  .delete(protect, projectsController.deleteProject);

router
  .route('/techused/:id') //
  // .get(protect, projectsController.getProject)
  .delete(protect, deleteTechUsed);

module.exports = router;
