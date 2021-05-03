const express = require('express');
const passport = require('passport');
router = express.Router();
const userCtrl= require('../controllers/user-controllers');


// @route = user/login

router.post('/login', userCtrl.login);

router.post('/signup', userCtrl.signup);

router.get('/auth/google',  passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: '/error' }), userCtrl.googleRedirect)

module.exports = router;