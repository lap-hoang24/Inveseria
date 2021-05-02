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
   }
}, {collection: 'users'});

module.exports = mongoose.model('User', userSchema);