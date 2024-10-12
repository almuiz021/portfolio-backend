const express = require('express');

const router = express.Router();
const contactUsController = require('../controllers/contactUsController');
const authControllers = require('../controllers/authController');

router
  .route('/')
  .get(
    authControllers.protect,
    authControllers.restrictTo('admin'),
    contactUsController.getContactUs,
  )
  .post(contactUsController.createContactUs); //

module.exports = router;
