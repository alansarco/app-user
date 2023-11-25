const express = require('express');
const router = express.Router();
const { getAnnouncement } = require('../controllers/authController');

router.get('/home', (req, res)=>{
    res.status(200).render('home', {page: 'home'});
});
router.get('/profile', (req, res)=>{
    res.status(200).render('profile', {page: 'profile'});
});
module.exports = router;