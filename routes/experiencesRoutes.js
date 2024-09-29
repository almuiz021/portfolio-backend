const express = require('express');
const router = express.Router();

const expController = require('../controllers/expController');
const { protect } = require('../controllers/authController');

router
  .route('/')
  .post(protect, expController.createExp) //
  .patch(protect, expController.updateExp)
  .get(protect, expController.getAllExp);

router
  .route('/:id')
  .get(protect, expController.getExp) //
  .delete(protect, expController.deleteExp);

module.exports = router;
