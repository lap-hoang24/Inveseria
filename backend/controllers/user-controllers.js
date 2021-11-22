const User = require('../models/User');
const jwt = require('jsonwebtoken');

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
      let user = await User.findOne({ _id: req.body.userId });

      user ? res.send(user) : res.send("user not found, please try again")
   } catch (err) {
      console.error(err);
   }
}


exports.updateRewardAccept = async (req, res) => {
   const { userId } = req.body;

   let updatedReward = await User.findByIdAndUpdate(userId, { acceptedReward: true });

   res.send(updatedReward)
}



exports.updateDidSearch = async (req, res) => {
   const { userId } = req.body;

   let updateDidSearch = await User.findByIdAndUpdate(userId, { didSearch: true });

   res.send(updateDidSearch);
}

exports.logout = (req, res) => {
   res.clearCookie("id")
   res.redirect('http://localhost:3000/login');
}

exports.googleRedirect = (req, res) => {
   // Successful authentication, redirect success.
   const userId = req.user._id;
   const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET);

   res.cookie("jwt", accessToken);
   res.cookie("id", userId);
   res.redirect('http://localhost:3000/');
}



