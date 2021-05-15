const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const passport = require('passport');

passport.use(new GoogleStrategy({
   clientID: process.env.CLIENT_ID,
   clientSecret: process.env.CLIENT_SECRET,
   callbackURL: "/auth/google/redirect"
},
   async function (accessToken, refreshToken, profile, done) {
      try {
         let currentUser = await User.findOne({ googleId: profile.id });
         if (currentUser) {

            done(null, currentUser);
         } else {
            const userGoogle = {
               googleId: profile._json.sub,
               username: profile._json.given_name,
               email: profile._json.email,
               picture: profile._json.picture
            };
            let newUser = await User.create(userGoogle);
            done(null, newUser);
         }
      } catch (err) {
         console.error(err)
      }
   }
));

passport.serializeUser(function (user, cb) {
   cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
   cb(null, obj);
});