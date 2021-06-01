const Ticker = require('../models/Ticker');
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const Transaction = require('../models/Transaction');



// .../addIntraday - POST
exports.addIntraday = async (req, res) => {
   let result = await Ticker.updateOne(
      { ticker: req.body.data[0].symbol },
      { $set: { intraday: req.body.data } }
   )

   res.send(result);
}

// .../getIntraday - GET
exports.getIntraday = async (req, res) => {
   let stock = await Ticker.findOne({ ticker: req.params.ticker })

   stock ? res.send(stock) : res.send('no stock found')
}

// .../getAllStocks - GET
exports.getAllStocks = async (req, res) => {
   let allStocks = await Ticker.find({ intraday: [] })

   res.send(allStocks);
}

// .../buyStock - POST
exports.buyStock = async (req, res) => {
   // check if user already has this position (ticker)
   // if YES, accumulate
   // if NO, create new posistion

   const { price, numOfShares, tickerInfo, userId } = req.body;
   let addedPosition;

   let userPosition = await Portfolio.findOne({ userId: userId, ticker: tickerInfo.ticker })

   if (userPosition) {
      let updatedNumOfShares = parseInt(numOfShares) + userPosition.numOfShares;
      let updatedAvgPrice = ((price * parseInt(numOfShares)) + (userPosition.avgPrice * userPosition.numOfShares)) / updatedNumOfShares;

      addedPosition = await Portfolio.updateOne(
         { userId: userId, ticker: tickerInfo.ticker },
         { $set: { avgPrice: updatedAvgPrice, numOfShares: updatedNumOfShares } }
      )
   } else {
      let avgPrice = price * numOfShares / numOfShares;
      addedPosition = await Portfolio.create({
         userId,
         avgPrice,
         ticker: tickerInfo.ticker,
         logo: tickerInfo.logo,
         name: tickerInfo.companyName,
         numOfShares,
      })
   }

   // add to Transactions
   let info = {
      userId,
      numOfShares,
      price,
      action: 'buy',
      ticker: tickerInfo.ticker,
      name: tickerInfo.companyName,
      logo: tickerInfo.logo,
   }
   let newTransaction = await Transaction.create(info);

   res.status(200).send(addedPosition);
}



// .../search-ticker - POST
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


// .../getUserPortfolio - POST

exports.getUserPortfolio = async (req, res) => {
   const { userId } = req.body;
   let totalBalance = 0;
   

   let portfolios = await Portfolio.find({ userId , numOfShares: {$gte: 1}})
   let tickerArr = portfolios.map(portfo => portfo.ticker)
   let portfoIntra = await Ticker.find({ 'ticker': { $in: tickerArr } }, {ticker: 1, intraday: 1})

   // console.log('intra', portfoIntra)
   
   portfolios.forEach(port => {
      totalBalance += port.avgPrice * port.numOfShares;
   })
  
   const userPorfo = {portfolios, portfoIntra};

   res.send(userPorfo);
}



// .../getPortfoIntra - POST

exports.getPortfoIntra = async (req, res) => {
   console.log(req.body);

   let portfoIntra = await Ticker.find({ 'ticker': { $in: req.body } }, {ticker: 1, intraday: 1})

   res.send(portfoIntra);
}