const express = require('express');
const router = express.Router();
const { loginPage } = require('../controllers/authController');

router.get('/login', loginPage);

module.exports = router;