const User = require('../models/User');


exports.login = async (req, res) => {
  let user = await User.findOne({username: req.body.username});
  if (user) {
     if(user.password === req.body.password) {
        res.status(200).send(user);
     };
  }
}



