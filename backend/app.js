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
const Ticker = require('./models/Ticker');

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
const stockRoutes = require('./routes/stock-routes');
const chatRoutes = require('./routes/chat-routes');
app.use('/auth', userRoutes);
app.use('/stockApi', stockRoutes);
app.use('/chatApi', chatRoutes);



app.post('/getTicker', async (req, res) => {
   const { logo, sector, tags, symbol, name } = req.body.data;

   let existTicker = await Ticker.findOne({ ticker: symbol });

   if (existTicker) {
      res.send( symbol + ' already exists in Database')
   } else {
      let tickerInfo = {
         logo: logo,
         sector: sector,
         tags: tags,
         ticker: symbol,
         companyName: name
      }
      let newTicker = await Ticker.create(tickerInfo);

      res.send(symbol + ' added to database');
   }
})

app.listen(PORT, () => {
   console.log('listening on port ' + PORT);
})