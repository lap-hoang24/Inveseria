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
   }
}, {collection: 'users'});

module.exports = mongoose.model('User', userSchema);