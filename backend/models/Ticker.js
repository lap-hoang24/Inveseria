const mongoose = require('mongoose');

const tickerSchema = mongoose.Schema({
   ticker: {
      type: String,
      required: true,
   },
   companyName: {
      type: String,
      required: true
   },
   logo: {
      type: String,
      required: true
   },
   sector: {
      type: String,
      required: true
   },
   tags: {
      type: Array,
      required: true
   },
   intraday: {
      type: Array,
      required: false
   }
}, {collection: 'tickers'})

module.exports = mongoose.model('Ticker', tickerSchema);