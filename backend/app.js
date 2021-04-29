const express = require('express');
const dotenv = require('dotenv');
app = express();
dotenv.config();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const cors = require('cors');
const PORT = process.env.PORT;
let userProfile;


// database connection

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
const connection = mongoose.connection;
connection.once('open', () => { console.log("Connected to MongoDB") });
connection.on('error', (err) => { console.error(err) })

// middlewares

app.use(express.json());
app.use(cors());
app.use(session({
   resave: false,
   saveUninitialized: true,
   secret: 'SECRET'
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
   cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
   cb(null, obj);
});


passport.use(new GoogleStrategy({
   // clientID: process.env.CLIENT_ID,
   // clientSecret: process.env.CLIENT_SECRET,
   clientID: "789728722377-fnvevaqgkb6b1qo0v9vd38rb1u3k803p.apps.googleusercontent.com",
   clientSecret: "-ETJu1_NeEqSmky4H_gUND34",
   callbackURL: "/auth/google/redirect"
},
   function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
   }
));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/redirect',
   passport.authenticate('google', { failureRedirect: '/error' }),
   function (req, res) {
      // Successful authentication, redirect success.
      res.redirect('/success');
   });

app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

// import routes
const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);



app.get('/', (req, res) => {
   res.send('first getting');
})

app.listen(PORT, () => {
   console.log('listening on port ' + PORT);
})