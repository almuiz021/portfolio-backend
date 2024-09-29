const express = require('express');
const checkControllers = require('../controllers/checkControllers');

const router = express.Router();

router
  .route('/:username') //
  .get(checkControllers.checkUsername);

router
  .route('/email/:email') //
  .get(checkControllers.checkEmail);

module.exports = router;
