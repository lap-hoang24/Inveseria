const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
   userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
   },
   content: {
      type: String,
      required: true,
   },
   createdAt: {
      type: String,
      required: true,
   },
}, { collection: 'chats' });


module.exports = mongoose.model('Chat', chatSchema)