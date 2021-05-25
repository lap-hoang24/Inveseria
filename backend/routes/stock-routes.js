const express = require('express');
router = express.Router();
const stockCtrl = require('../controllers/stock-controllers');

// @ route = /stockApi/...

router.post('/addIntraday', stockCtrl.addIntraday);

router.get('/getIntraday/:ticker', stockCtrl.getIntraday);

router.post('/search-ticker', stockCtrl.searchTicker);

router.get('/getAllStocks', stockCtrl.getAllStocks);

router.post('/buyStock', stockCtrl.buyStock);

module.exports = router;