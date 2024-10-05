const express = require('express');
const router = express.Router();

const expController = require('../controllers/expController');
const { protect } = require('../controllers/authController');
const { deleteDuty } = require('../controllers/dutyController');

router
  .route('/')
  .post(protect, expController.createExp) //
  .patch(protect, expController.update_createExp)
  .get(protect, expController.getAllExp);

router
  .route('/:id')
  .get(protect, expController.getExp) //
  .delete(protect, expController.deleteExp);

router
  .route('/duty/:id')
  // .get(protect, expController.getExp) //
  .delete(protect, deleteDuty);

module.exports = router;
