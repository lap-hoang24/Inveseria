const express = require('express');
router = express.Router();
const stockCtrl = require('../controllers/stock-controllers');

const checkAuth = require('../middlewares/checkAuth');

// @ route = /stockApi/...

// router.post('/addIntraday', checkAuth ,stockCtrl.addIntraday);

router.get('/getIntraday/:ticker', checkAuth ,stockCtrl.getIntraday);

// router.get('/getAllStocks', checkAuth ,stockCtrl.getAllStocks);

router.post('/getTrendingStocks', stockCtrl.getTrendingStocks);

router.get('/getWatchlist', checkAuth ,stockCtrl.getWatchlist);

router.post('/getUserPosition/', checkAuth ,stockCtrl.getUserPosition);

router.post('/search-ticker', stockCtrl.searchTicker);

router.post('/buyStock', checkAuth, stockCtrl.buyStock);

router.post('/sellStock', checkAuth, stockCtrl.sellStock);

router.post('/getUserPortfolio', checkAuth ,stockCtrl.getUserPortfolio);

router.post('/getPortfoIntra', checkAuth ,stockCtrl.getPortfoIntra);

router.post('/setFavorite', checkAuth ,stockCtrl.setFavorite);

router.get('/getAllTransactions', checkAuth , stockCtrl.getAllTransactions);

// router.get('/getBrokenPrices', stockCtrl.getBrokenPrices);








// router.get('/getLogos', stockCtrl.getLogos);

module.exports = router;