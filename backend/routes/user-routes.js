const express = require('express');
router = express.Router();
const userCtrl= require('../controllers/user-controllers');
const passport = require('passport');
const checkAuth = require('../middlewares/checkAuth');

// @route = user/...

router.post('/login', userCtrl.login);

router.post('/signup', userCtrl.signup);

router.post('/info', checkAuth ,userCtrl.getUserInfo);

router.get('/logout', userCtrl.logout);

router.post('/updateRewardAccept', userCtrl.updateRewardAccept);

router.post('/updateDidSearch', userCtrl.updateDidSearch);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/login' }), userCtrl.googleRedirect);

module.exports = router;