const User = require('../models/User');
const passport = require('passport');

exports.login = async (req, res) => {
   try {
      // console.log(req);
      let user = await User.findOne({ username: req.body.username });
      if (user) {
         if (user.password === req.body.password) {
            res.status(200).send(user);
         };
      } else {
         res.send('user not found')
      }
   } catch (err) {
      console.error(err)
   }
}


exports.signup = async (req, res) => {
   // console.log(req)
   let checkUsername = await User.findOne({ username: req.body.username });
   let checkEmail = await User.findOne({ email: req.body.email });

   if (checkUsername) {
      res.send("username already exists");
   } else if (checkEmail) {
      res.send('this email has been used');
   } else {
      User.create(req.body);
      res.status(200).send("you have succesfully signed up");
   }
}

exports.getUserInfo = async (req, res) => {
   try {
      let user = await User.findOne({ email: req.body.email });

      user ? res.send(user) : res.send("user not found, please try again")
   } catch (err) {
      console.error(err);
   }
}


exports.logout = (req, res) => {
   // req.logout();
   res.clearCookie("email")
   res.redirect('http://localhost:3000/login');
}

exports.googleRedirect = (req, res) => {
   console.log(req.session)
   res.redirect('http://localhost:3000/login');

}



