const express = require('express');
router = express.Router();
const stockCtrl = require('../controllers/stock-controllers');


router.post('/addIntraday', stockCtrl.addIntraday);
router.get('/getIntraday/:ticker', stockCtrl.getIntraday);

module.exports = router;