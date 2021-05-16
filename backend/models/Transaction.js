const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
   userId: {
      type: moongose.Schema.ObjectId,
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
   action: {
      type: String,
      required: true,
   },
   amount: {
      type: Number,
      required: true
   },
   createdAt: {
      type: String,
      required: true,
      default: new Date().toJSON()
   }
}, { collection: 'transactions' });

module.exports = mongoose.model('Transaction', transactionSchema)