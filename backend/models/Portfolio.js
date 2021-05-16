const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema({
   userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
   },
   ticker: {
      logo: {
         type: String,
         required: true,
      },
      name: {
         type: String,
         required: true,
      }
   }, 
   avgPrice: {
      type: Number,
      required: true,
   },
   numOfShares: {
      type: Number,
      required: true,
   }
}, {collection: 'portfolios'});


module.exports = mongoose.model('Portfolio', portfolioSchema)