const express = require('express');

const router = express.Router();
const contactMeController = require('../controllers/contactMeController');
router
  .route('/')
  .post(contactMeController.createContacts) //
  .patch(contactMeController.updateContacts)
  .get(contactMeController.getContacts)
  .delete(contactMeController.deleteContacts);

module.exports = router;
