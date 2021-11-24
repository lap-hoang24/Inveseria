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

   const userId = req.user;

   try {
      let user = await User.findOne({ _id: userId });

      user ? res.send(user) : res.send("user not found, please try again")
   } catch (err) {
      console.error(err);
   }
}


exports.updateRewardAccept = async (req, res) => {
   const userId = req.user;

   let updatedReward = await User.findByIdAndUpdate(userId, { acceptedReward: true });

   res.send(updatedReward)
}



exports.updateDidSearch = async (req, res) => {
   const userId = req.user;

   let updateDidSearch = await User.findByIdAndUpdate(userId, { didSearch: true });

   res.send(updateDidSearch);
}

exports.logout = (req, res) => {
   res.clearCookie("id")
   res.redirect('/login');
}

exports.googleRedirect = (req, res) => {
   // Successful authentication, redirect success.
   const userId = req.user._id;
   const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET);
   req.user = userId;
   res.cookie("jwt", accessToken, { maxAge: 60 * 60 * 1000 });
   res.redirect('/');
}


exports.githubAuth = (req, res) => {
   res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.githubClientId}`);
}


exports.githubRedirect = async (req, res) => {
   const userId = req.user;

   const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET);

   res.cookie("jwt", accessToken, { maxAge: 60 * 60 * 1000 });

   res.redirect('/');
}


exports.anonymousSignin = async (req, res) => {
   const anonymousGuest = {
      username: 'Guest',
      email: 'anonymous@gmail.com',
      picture: 'https://media.istockphoto.com/vectors/mask-superhero-carnival-mask-icon-vector-vector-id1152496819?k=20&m=1152496819&s=612x612&w=0&h=HQD7jeQkoZnaZTshIM9FeDRDBUd-rJo8RqQ9EDqlNB0=',
   }

   console.log('gaa');
   let newUser = await User.create(anonymousGuest);
   const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

   res.cookie("jwt", accessToken, { maxAge: 60 * 60 * 1000 });

   res.redirect('/');
}