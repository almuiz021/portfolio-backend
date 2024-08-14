const express = require('express');
const router = express.Router();

const expController = require('../controllers/expController');

router
  .route('/')
  .post(expController.createExp) //
  .patch(expController.updateExp)
  .get(expController.getAllExp);

router
  .route('/:id')
  .get(expController.getExp) //
  .delete(expController.deleteExp);

module.exports = router;
