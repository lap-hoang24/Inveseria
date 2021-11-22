const express = require('express');
const dotenv = require('dotenv');
app = express();
dotenv.config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const GoogleOAuth = require('./middlewares/passport');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const userRoutes = require('./routes/user-routes');
const stockRoutes = require('./routes/stock-routes');
const chatRoutes = require('./routes/chat-routes');

// database connection

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
const connection = mongoose.connection;
connection.once('open', () => { console.log("Connected to MongoDB") });
connection.on('error', (err) => { console.error(err) })

// middlewares

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));
app.use(passport.initialize());



// app.use(function(req, res, next) {
//    res.header('Content-Type', 'application/json;charset=UTF-8')
//    res.header('Access-Control-Allow-Credentials', true);
//    res.header('Access-Control-Allow-Origin', "*");
//    res.header(
//      'Access-Control-Allow-Headers',
//      'Origin, X-Requested-With, Content-Type, Accept'
//    )
//    next()
//  })
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// import routes
app.use('/auth', userRoutes);
app.use('/stockApi', stockRoutes);
app.use('/chatApi', chatRoutes);


app.listen(PORT, () => {
   console.log('listening on port ' + PORT);
})