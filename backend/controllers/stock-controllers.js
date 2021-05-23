const Ticker = require('../models/Ticker');

exports.addIntraday = async (req, res) => {
   let result = await Ticker.updateOne(
      { ticker: req.body.data[0].symbol },
      { $set: { intraday: req.body.data } }
   )

   res.send(result);
}


exports.getIntraday = async (req, res) => {
   let stock = await Ticker.findOne({ticker: req.params.ticker})

   stock ? res.send(stock) : res.send('no stock found')
}