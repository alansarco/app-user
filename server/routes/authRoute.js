const express = require('express');
const router = express.Router();
const { loginPage, loginUser, logout, password } = require('../controllers/authController');

router.get('/login', loginPage);
router.post('/login', loginUser);
router.get('/logout', logout);
router.get('/password', password);

module.exports = router;