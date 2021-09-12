const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema({
   userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
   },
   ticker: {
      type: String,
      required: true,
   },
   logo: {
      type: String,
      required: false,
   },
   name: {
      type: String,
      required: true,
   },
   avgPrice: {
      type: Number,
      required: true,
   },
   numOfShares: {
      type: Number,
      required: true,
      default: 0
   }
}, { collection: 'portfolios' });


module.exports = mongoose.model('Portfolio', portfolioSchema)