const Ticker = require('../models/Ticker');
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c32dffiad3ieculvh350" // Replace this
const finnhubClient = new finnhub.DefaultApi()


// ==================================================================================
// .../getIntraday - GET
// ==================================================================================
exports.getIntraday = async (req, res) => {
   let stock = await Ticker.findOne({ ticker: req.params.ticker })
   stock ? res.send(stock) : res.send('no stock found')
}

// ==================================================================================
// .../buyStock - POST
// ==================================================================================

exports.buyStock = async (req, res) => {
   const { price, numOfShares, tickerInfo, userId } = req.body;
   let addedPosition, userPosition, updatedNumOfShares, updatedAvgPrice, avgPrice, updatedCash, cashAmount, totalPurchase, updatedUserCash;
   let createdOn = new Date().toJSON().slice(0, 10);
   let createdAt = new Date().toJSON();


   // check if user already has this position (ticker)
   // if YES, accumulate
   // if NO, create new posistion

   userPosition = await Portfolio.findOne({ userId: userId, ticker: tickerInfo.ticker })

   if (userPosition.data !== "") {
      updatedNumOfShares = parseInt(numOfShares) + userPosition.numOfShares;
      updatedAvgPrice = ((parseInt(price) * parseInt(numOfShares)) + (userPosition.avgPrice * userPosition.numOfShares)) / updatedNumOfShares;

      addedPosition = await Portfolio.updateOne(
         { userId: userId, ticker: tickerInfo.ticker },
         { $set: { avgPrice: updatedAvgPrice, numOfShares: updatedNumOfShares } }
      )
   } else {
      avgPrice = price * numOfShares / numOfShares;
      addedPosition = await Portfolio.create({
         userId,
         avgPrice,
         ticker: tickerInfo.ticker,
         name: tickerInfo.companyName,
         numOfShares,
      })
   }

   totalPurchase = price * numOfShares;
   cashAmount = await User.findOne({ _id: userId }, { cash: 1 });
   updatedCash = cashAmount.cash - totalPurchase;

   updatedUserCash = await User.updateOne({ _id: userId }, { $set: { cash: updatedCash } });

   // add to Transactions
   let info = {
      userId,
      numOfShares,
      price,
      action: 'buy',
      createdAt: createdAt,
      createdOn: createdOn,
      ticker: tickerInfo.ticker,
      name: tickerInfo.companyName,
   }
   let newTransaction = await Transaction.create(info);

   res.status(200).send(addedPosition);
}

// ==================================================================================
// .../sellStock - POST
// ==================================================================================

exports.sellStock = async (req, res) => {
   const { price, numOfShares, tickerInfo, userId } = req.body;
   let userPosition, updatedNumOfShares, totalLiquidation, updatedAvgPrice, cashAmount, updatedCash, updatedPosition;
   let createdOn = new Date().toJSON().slice(0, 10);
   let createdAt = new Date().toJSON();

   userPosition = await Portfolio.findOne({ userId, ticker: tickerInfo.ticker })

   // recalculate AvgPrice
   totalLiquidation = (parseInt(price) * parseInt(numOfShares));
   updatedNumOfShares = userPosition.numOfShares - parseInt(numOfShares);
   updatedAvgPrice = ((userPosition.avgPrice * userPosition.numOfShares) - totalLiquidation) / updatedNumOfShares;
   // add sold shares money to CASH
   cashAmount = await User.findOne({ _id: userId }, { cash: 1 });
   updatedCash = cashAmount.cash + totalLiquidation;
   // numOfShares = parseInt(numOfShares);

   // update user position and user cash amount
   updatedPosition = await Portfolio.updateOne({ userId, ticker: tickerInfo.ticker }, { $set: { numOfShares: updatedNumOfShares, avgPrice: updatedAvgPrice } })
   updatedUserCash = await User.updateOne({ _id: userId }, { $set: { cash: updatedCash } });


   // add to Transactions

   let info = {
      userId,
      numOfShares,
      price,
      action: 'sell',
      createdAt: createdAt,
      createdOn: createdOn,
      ticker: tickerInfo.ticker,
      name: tickerInfo.companyName,
      logo: tickerInfo.logo,
   }
   let newTransaction = await Transaction.create(info);
   res.redirect(301, 'http://localhost:3000/');
}

// ==================================================================================
// .../getUserPosition - POST
// ==================================================================================

exports.getUserPosition = async (req, res) => {
   const { ticker, userId } = req.body;
   let userPosition;
   let position = await Portfolio.findOne({ ticker, userId })
   let accountInfo = await User.findOne({ _id: userId }, { cash: 1, watchlist: 1 });
   // position ? res.send(userPosition) : res.send({ _doc: { noPosition: true } })

   if (position) {
      userPosition = { ...position, userCash: accountInfo.cash, watchlist: accountInfo.watchlist };
   } else {
      userPosition = { _doc: { noPosition: true }, userCash: accountInfo.cash, watchlist: accountInfo.watchlist };
   }

   res.send(userPosition)
}


// ==================================================================================
// .../search-ticker - POST
// ==================================================================================

exports.searchTicker = async (req, res) => {
   const { query } = req.body;

   if (query != '') {
      let stocks = await Ticker.find(
         {
            $or: [
               { ticker: { "$regex": query, "$options": 'i' } },
               { companyName: { "$regex": query, "$options": 'i' } }
            ]
         },
         { ticker: 1, companyName: 1 })
      stocks ? res.send(stocks) : res.send('no stocks found');
   } else {
      res.send('searching...')
   }
}

// ==================================================================================
// .../getTrendingStocks - POST
// ==================================================================================

exports.getTrendingStocks = async (req, res) => {
   let trendingStocks = await Ticker.find({ 'ticker': { $in: req.body } }, { ticker: 1, companyName: 1 });

   res.send(trendingStocks);
}

// ==================================================================================
// .../getUserPortfolio - POST
// ==================================================================================
exports.getUserPortfolio = async (req, res) => {
   const { userId } = req.body;
   // let totalBalance = 0;

   let portfolios = await Portfolio.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId), numOfShares: { $gte: 1 } } },
      { $lookup: { from: 'tickers', localField: 'ticker', foreignField: 'ticker', as: 'tickerValue' } },
      {
         $project: {
            "avgPrice": 1,
            "name": 1,
            "ticker": 1,
            "numOfShares": 1,
            "tickerValue.logo": 1,
            "tickerValue.intraday": 1,
         }
      },
   ])

   res.send(portfolios);
}


// ==================================================================================
// .../getPortfoIntra - POST
// ==================================================================================
exports.getPortfoIntra = async (req, res) => {

   let portfoIntra = await Ticker.find({ 'ticker': { $in: req.body } }, { ticker: 1, intraday: 1 })
   res.send(portfoIntra);
}


// ==================================================================================
// .../setFavorite - POST 
// ==================================================================================
exports.setFavorite = async (req, res) => {
   const { ticker, status, userId } = req.body;
   let result;

   if (status === true) {
      result = await User.updateOne({ _id: userId }, { $addToSet: { watchlist: ticker } })
   } else if (status === false) {
      result = await User.updateOne({ _id: userId }, { $pull: { watchlist: ticker } })
   } else {
      result = 'no action'
   }
   res.send(result);
}


// ==================================================================================
// .../getWatchlist - GET
// ==================================================================================
exports.getWatchlist = async (req, res) => {
   const { userId } = req.query;

   let watchlist = await User.findOne({ _id: userId }, { watchlist: 1 });

   let watchlistInfo = await Ticker.find({ ticker: { $in: watchlist.watchlist } }, { sector: 0, companyName: 0, tags: 0 });

   res.send(watchlistInfo);
}


// ==================================================================================
// .../getAllTransactions - GET
// ==================================================================================


exports.getAllTransactions = async (req, res) => {
   const { userId } = req.query;

   let response = await Transaction.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      { $lookup: { from: 'tickers', localField: 'ticker', foreignField: 'ticker', as: 'tickerLogo' } },
      {
         $project: {
            "createdOn": 1,
            "numOfShares": 1,
            "price": 1,
            "createdOn": 1,
            // "createdAt": {
            //    $convert: {
            //       input: "$createdAt",
            //       to: "decimal"
            //    }
            // },
            "createdAt": 1,
            "action": 1,
            "ticker": 1,
            "name": 1,
            "tickerLogo.logo": 1,
         }
      },
      { $group: { _id: "$createdOn", transaction: { $push: "$$ROOT" } } },
      { $sort: { _id: -1 } },
   ])

   res.send(response);
}



// ==================================================================================
// .../getAllStocks - GET
// ==================================================================================

exports.getAllStocks = async (req, res) => {
   let allStocks = await Ticker.find({}, { ticker: 1 });

   res.send(allStocks);
}


// ==================================================================================
// .../addIntraday - POST
// ==================================================================================

exports.addIntraday = async (req, res) => {

   let result = await Ticker.updateOne(
      { ticker: req.body.ticker },
      { $set: { intraday: req.body.prices } }
   )

   res.send(result);
}


exports.getBrokenPrices = async (req, res) => {
   // console.log(req.body);

   let results = await Portfolio.findOne({ userId: '60aa91691de2e12c57399cad', ticker: 'TSLA' })

   res.send(results);
}

// exports.getLogos = async (req, res) => {
//    // get all tickers from ticker collections
//    let allTickers = await Ticker.find({ logo: { $in: ['', null] } }, { ticker: 1, logo: 1 });

//    let i = 0;
//    const interval = setInterval(() => {
//       finnhubClient.companyProfile2({ 'symbol': allTickers[i].ticker }, (error, data, response) => {
//          Ticker.findOneAndUpdate({ ticker: allTickers[i].ticker }, { logo: data.logo })
//             .then(resp => { console.log('ok - ' + resp.ticker); i = i + 1; })
//             .catch(error => { console.log(error); });
//       });
//    }, 2500)

//    res.send(allTickers)
// }