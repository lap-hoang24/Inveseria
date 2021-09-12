const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
   userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
   },
   ticker: {
      type: String,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   action: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true
   },
   numOfShares: {
      type: Number,
      required: true,
      default: 0,
   },
   createdAt: {
      type: String,
      required: true,
   },
   createdOn: {
      type: String,
      required: true,
   },
}, { collection: 'transactions' });

module.exports = mongoose.model('Transaction', transactionSchema)