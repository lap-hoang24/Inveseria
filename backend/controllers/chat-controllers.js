const User = require('../models/User');
const Chat = require('../models/Chat');



exports.getAllChats = async (req, res) => {
   // let allChats = await Chat.find({});
   let allChats = await Chat.aggregate([
      { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'userInfo' } },
      {
         $project: {
            "content": 1,
            "createdAt": 1,
            "userId": 1,
            "userInfo.picture": 1,
            "userInfo.username": 1,
         }
      },
   ]);

   res.send(allChats);
}


exports.sendChat = async (req, res) => {
   const { userId, content } = req.body;
   let createdAt = new Date().getTime();

   let saveChat = await Chat.create({ userId, content, createdAt });

   console.log(req.body);

   res.send(saveChat)
}






