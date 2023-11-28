const express = require('express');
const router = express.Router();
const { loginPage, loginUser, logout } = require('../controllers/authController');

router.get('/login', loginPage);
router.post('/login', loginUser);
router.get('/logout', logout);

module.exports = router;