const express = require('express');
router = express.Router();
const userCtrl= require('../controllers/user-controllers');
const passport = require('passport');


// @route = user/...

router.post('/login', userCtrl.login);

router.post('/signup', userCtrl.signup);

router.post('/info', userCtrl.getUserInfo);

router.get('/logout', userCtrl.logout);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/login' }), userCtrl.googleRedirect);

module.exports = router;