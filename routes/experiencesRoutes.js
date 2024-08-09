const express = require('express');
const router = express.Router();

const expController = require('../controllers/expController');

router
  .route('/')
  .post(expController.createExp) //
  .patch(expController.updateExp);

module.exports = router;
