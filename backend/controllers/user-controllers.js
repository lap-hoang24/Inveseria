const User = require('../models/User');


exports.login = async (req, res) => {
  let user = await User.findOne({username: req.body.username});
  if (user) {
     if(user.password === req.body.password) {
        res.status(200).send(user);
     };
  } else {
     res.status(404).send({error: "user not found"})
  }
}


exports.signup = async (req, res) => {
   let checkUsername = await User.findOne({username: req.body.username});
   let checkEmail = await User.findOne({email: req.body.email});
   
   if (checkUsername) {
      res.send({message: 'username already exists'});
   } else if (checkEmail) {
      res.send({message: 'this email has been used'});
   } else {
      User.create(req.body);
      res.status(200).send({message: 'you have successfully signed up!'});
   }
}



