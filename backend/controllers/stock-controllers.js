const Ticker = require('../models/Ticker');


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
   let stock = await Ticker.findOne({ticker: req.params.ticker})

   stock ? res.send(stock) : res.send('no stock found')
}


exports.getAllStocks = async (req, res) => {
   let allStocks = await Ticker.find({intraday: []})

   res.send(allStocks);
}


// /stockApi/search-ticker - POST
exports.searchTicker = async (req, res) => {
   let regexQuery = {
      companyName: new RegExp(req.body.companyName, 'i'),
   }
   if (req.body.companyName != '') {
      let stocks = await Ticker.find(regexQuery, {ticker: 1, companyName: 1}).sort({ticker: 1});
      stocks ? res.send(stocks) : res.send('no stocks found');
   } else {
      res.send('searching...')
   }
}