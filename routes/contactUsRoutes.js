const express = require('express');

const router = express.Router();
const contactUsController = require('../controllers/contactUsController');

router
  .route('/')
  .get(contactUsController.getContactUs)
  .post(contactUsController.createContactUs); //

module.exports = router;
