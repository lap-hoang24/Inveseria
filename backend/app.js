const express = require('express');
const dotenv = require('dotenv');
app = express();
dotenv.config();
const mongoose = require('mongoose');
const session = require('express-session');
const cookieSession = require('cookie-session');
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

// app.use(cookieSession({
//    name: "Inveseria",
//    keys: ["Investingaaaaa"],
//    maxAge: 60*60*1000, //1hour
// }))

app.use(cookieParser());

app.use(passport.initialize());
// app.use(passport.session());

// import routes
const userRoutes = require('./routes/user-routes');
app.use('/auth', userRoutes);

app.listen(PORT, () => {
   console.log('listening on port ' + PORT);
})