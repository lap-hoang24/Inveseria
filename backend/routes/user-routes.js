const express = require('express');
router = express.Router();
const userCrl= require('../controllers/user-controllers');

// @route = user/login

router.post('/login', userCrl.login);

module.exports = router;