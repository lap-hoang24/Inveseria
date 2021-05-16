const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
   userId: {
      type: mongoose.Schema.ObjectId,
      required: true
   },
   total: {
      type: Number,
      required: true,
      default: 0,
   },
}, {collection: 'accounts'});


module.exports = mongoose.model('Account', accountSchema);