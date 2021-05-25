const Ticker = require('../models/Ticker');
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');


// /stockApi/addIntraday - POST
exports.addIntraday = async (req, res) => {
   let result = await Ticker.updateOne(
      { ticker: req.body.data[0].symbol },
      { $set: { intraday: req.body.data } }
   )

   res.send(result);
}

// /stockApi/getIntraday - GET
exports.getIntraday = async (req, res) => {
   let stock = await Ticker.findOne({ ticker: req.params.ticker })

   stock ? res.send(stock) : res.send('no stock found')
}


exports.getAllStocks = async (req, res) => {
   let allStocks = await Ticker.find({ intraday: [] })

   res.send(allStocks);
}

exports.buyStock = async (req, res) => {
   const { price, numOfShares, tickerInfo, userId } = req.body;

   let avgPrice = price * numOfShares / numOfShares;

   // check if user already has this position (ticker)
   // if YES, accumulate
   // if NO, create new posistion

   let portfolio = await Portfolio.create({
      userId,
      avgPrice,
      company: { name: tickerInfo.companyName, logo: tickerInfo.logo, ticker: tickerInfo.ticker },
      numOfShares
   })

   res.send(portfolio)
}


// /stockApi/search-ticker - POST
exports.searchTicker = async (req, res) => {
   let regexQuery = {
      companyName: new RegExp(req.body.companyName, 'i'),
   }
   if (req.body.companyName != '') {
      let stocks = await Ticker.find(regexQuery, { ticker: 1, companyName: 1 }).sort({ ticker: 1 });
      stocks ? res.send(stocks) : res.send('no stocks found');
   } else {
      res.send('searching...')
   }
}