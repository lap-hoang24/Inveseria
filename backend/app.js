const express = require('express');
const dotenv = require('dotenv');
app = express();
dotenv.config();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const GoogleOAuth = require('./middlewares/passport');
const cors = require('cors');
const cookieSession = require('cookie-session');
const PORT = process.env.PORT;

// database connection

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
const connection = mongoose.connection;
connection.once('open', () => { console.log("Connected to MongoDB") });
connection.on('error', (err) => { console.error(err) })

// import routes
const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);


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
GoogleOAuth(passport);


// app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// app.get('/auth/google/redirect',
//    passport.authenticate('google', { failureRedirect: '/error' }),
//    function (req, res) {
//       // console.log(req.session)
//       res.redirect('http://localhost:3000/login');
//    }
// );


app.listen(PORT, () => {
   console.log('listening on port ' + PORT);
})