const express = require('express');
router = express.Router();
const chatCtrl = require('../controllers/chat-controllers');



router.get('/getAllChats', chatCtrl.getAllChats);

router.post('/sendChat', chatCtrl.sendChat);




module.exports = router;

