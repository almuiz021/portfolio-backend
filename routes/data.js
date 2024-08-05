const express = require('express');
const dataContollers = require('../controllers/data');

const router = express.Router();

// /api/test/all

router.route('/').get(dataContollers.getAllData);

router.route('/:id').get(dataContollers.getAllUserData);

module.exports = router;
