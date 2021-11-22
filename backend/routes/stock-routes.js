const express = require('express');
router = express.Router();
const stockCtrl = require('../controllers/stock-controllers');

const checkAuth = require('../middlewares/checkAuth');

// @ route = /stockApi/...

router.post('/addIntraday', checkAuth ,stockCtrl.addIntraday);

router.get('/getIntraday/:ticker', stockCtrl.getIntraday);

router.get('/getAllStocks', stockCtrl.getAllStocks);

router.post('/getTrendingStocks', stockCtrl.getTrendingStocks);

router.get('/getWatchlist', stockCtrl.getWatchlist);

router.post('/getUserPosition/', stockCtrl.getUserPosition);

router.post('/search-ticker', stockCtrl.searchTicker);

router.post('/buyStock', checkAuth, stockCtrl.buyStock);

router.post('/sellStock', checkAuth, stockCtrl.sellStock);

router.post('/getUserPortfolio', checkAuth ,stockCtrl.getUserPortfolio);

router.post('/getPortfoIntra', checkAuth ,stockCtrl.getPortfoIntra);

router.post('/setFavorite', stockCtrl.setFavorite);

router.get('/getAllTransactions', stockCtrl.getAllTransactions);

router.get('/getBrokenPrices', stockCtrl.getBrokenPrices);








// router.get('/getLogos', stockCtrl.getLogos);

module.exports = router;