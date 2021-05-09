const express = require('express');
router = express.Router();
const userCtrl= require('../controllers/user-controllers');

// @route = user/...

router.post('/login', userCtrl.login);

router.post('/signup', userCtrl.signup);

router.post('/info', userCtrl.getUserInfo);

router.get('/logout', userCtrl.logout);

module.exports = router;