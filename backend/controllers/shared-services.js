const Transaction = require('../models/Transaction');



exports.addTransaction = async (info) => {
   const {userId, }
   let transaction = await Transaction.create({info})

   console.log(transaction);
}