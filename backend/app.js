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
app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());

// import routes
app.use('/auth', userRoutes);
app.use('/stockApi', stockRoutes);
app.use('/chatApi', chatRoutes);


app.listen(PORT, () => {
   console.log('listening on port ' + PORT);
})