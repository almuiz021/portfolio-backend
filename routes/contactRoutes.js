const express = require('express');

const router = express.Router();
const contactMeController = require('../controllers/contactMeController');
const { protect } = require('../controllers/authController');

router
  .route('/')
  .get(protect, contactMeController.getContacts)
  .post(protect, contactMeController.createContacts) //
  .patch(protect, contactMeController.updateContacts)
  .delete(protect, contactMeController.deleteContacts);

module.exports = router;
