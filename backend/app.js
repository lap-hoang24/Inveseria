const express = require('express');
const dotenv = require('dotenv');
app = express();
dotenv.config();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');
const cors = require('cors');
const cookieSession = require('cookie-session');
const PORT = process.env.PORT;

// database connection

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
const connection = mongoose.connection;
connection.once('open', () => { console.log("Connected to MongoDB") });
connection.on('error', (err) => { console.error(err) })

// middlewares

app.use(express.json());
app.use(cors());
// app.use(session({
//    resave: false,
//    saveUninitialized: true,
//    secret: 'SECRET'
// }));
app.use(cookieSession({
   name: 'session',
   keys: "secreet",
   maxAge: "60*60*1000",
}))
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function (user, cb) {
   cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
   cb(null, obj);
});


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

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/redirect',
   passport.authenticate('google', { failureRedirect: '/error' }),
   function (req, res) {
      console.log(req.session)
      // Successful authentication, redirect success.
      res.redirect('http://localhost:3000/login');
   });

// import routes
const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);

app.listen(PORT, () => {
   console.log('listening on port ' + PORT);
})