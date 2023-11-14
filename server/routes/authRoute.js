const express = require('express');
const router = express.Router();
const { getAnnouncement } = require('../controllers/authController');

router.get('/getAnnouncement', getAnnouncement);

module.exports = router;