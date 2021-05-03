const User = require('../models/User');
const passport = require('passport');


exports.login = async (req, res) => {
   let user = await User.findOne({ username: req.body.username });
   if (user) {
      if (user.password === req.body.password) {
         res.status(200).send(user);
      };
   } else {
      res.send('user not found')
   }
}


exports.signup = async (req, res) => {
   let checkUsername = await User.findOne({ username: req.body.username });
   let checkEmail = await User.findOne({ email: req.body.email });
   let response = { message: "" }

   if (checkUsername) {
      response.message = "username already exists";
      res.send(response);
   } else if (checkEmail) {
      response.message = 'this email has been used';
      res.send(response);
   } else {
      User.create(req.body);
      response.message = "you have succesfully signed up";
      res.status(200).send(response);
   }
}

exports.googleRedirect = (req, res) => {
      console.log(req.session)
      res.redirect('http://localhost:3000/login');
}



