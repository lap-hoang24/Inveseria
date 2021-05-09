const express = require('express');
const dotenv = require('dotenv');
app = express();
dotenv.config();
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const GoogleOAuth = require('./middlewares/passport');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

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
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());


GoogleOAuth(passport);

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/redirect',
   passport.authenticate('google', { failureRedirect: '/login' }),
   function (req, res) {
      // Successful authentication, redirect success.
      res.cookie("email", req.session.passport.user.email);
      res.redirect('http://localhost:3000/login');
   });

// import routes
const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);

app.listen(PORT, () => {
   console.log('listening on port ' + PORT);
})