const express = require('express');
router = express.Router();
const userCtrl= require('../controllers/user-controllers');

// @route = user/login

router.post('/login', userCtrl.login);

router.post('/signup', userCtrl.signup);

module.exports = router;