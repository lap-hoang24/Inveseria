const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   googleId: {
      type: String,
      required: false,
   },
   username: {
      type: String,
      required: false,
   },
   email: {
      type: String,
      required: false,
   },
   password: {
      type: String,
      required: false,
   },
   picture: {
      type: String,
      required: false,
   },
   createdAt: {
      type: String,
      required: true,
      default: new Date().toJSON()
   },
   cash: {
      type: Number,
      required: true,
      default: 10000,
   },
   watchlist: {
      type: Array,
      required: true,
      default: [],
   }
}, {collection: 'users'});

module.exports = mongoose.model('User', userSchema);