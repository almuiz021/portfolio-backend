const express = require('express');
const router = express.Router();

const expController = require('../controllers/expController');
const { protect } = require('../controllers/authController');

router
  .route('/')
  .post(protect, expController.createExp) //
  .patch(protect, expController.update_createExp)
  .get(protect, expController.getAllExp);

router
  .route('/:id')
  .get(protect, expController.getExp) //
  .delete(protect, expController.deleteExp);

module.exports = router;
