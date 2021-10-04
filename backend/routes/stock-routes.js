const express = require('express');
router = express.Router();
const stockCtrl = require('../controllers/stock-controllers');

// @ route = /stockApi/...

router.post('/addIntraday', stockCtrl.addIntraday);

router.get('/getIntraday/:ticker', stockCtrl.getIntraday);

router.get('/getAllStocks', stockCtrl.getAllStocks);

router.post('/getTrendingStocks', stockCtrl.getTrendingStocks);

router.get('/getWatchlist', stockCtrl.getWatchlist);

router.post('/getUserPosition/', stockCtrl.getUserPosition);

router.post('/search-ticker', stockCtrl.searchTicker);

router.post('/buyStock', stockCtrl.buyStock);

router.post('/sellStock', stockCtrl.sellStock);

router.post('/getUserPortfolio', stockCtrl.getUserPortfolio);

router.post('/getPortfoIntra', stockCtrl.getPortfoIntra);

router.post('/setFavorite', stockCtrl.setFavorite);

router.get('/getAllTransactions', stockCtrl.getAllTransactions);

router.get('/getBrokenPrices', stockCtrl.getBrokenPrices);








// router.get('/getLogos', stockCtrl.getLogos);

module.exports = router;