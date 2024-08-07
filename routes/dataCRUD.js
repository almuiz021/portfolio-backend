const express = require('express');

const router = express.Router();

const dataCRUD = require('../controllers/homeController');

router
  .route('/:model')
  .get(dataCRUD.addSocials) //
  .post(dataCRUD.addSocials)
  .post(dataCRUD.addHome);

module.exports = router;
