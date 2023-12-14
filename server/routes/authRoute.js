const express = require('express');
const router = express.Router();
const { loginPage, loginUser, logout, password, changePassword } = require('../controllers/authController');

router.get('/', loginPage);
router.get('/login', loginPage);
router.post('/login', loginUser);
router.get('/logout', logout);
router.get('/password', password);
router.post('/changePassword', changePassword);

module.exports = router;