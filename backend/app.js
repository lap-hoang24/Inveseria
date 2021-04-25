const express = require('express');
const dotenv = require('dotenv');
app = express();
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user-routes');
const PORT = process.env.PORT;



// database connection

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
const connection = mongoose.connection;
connection.once('open', () => { console.log("Connected to MongoDB") });
connection.on('error', (err) => { console.error(err) })

// middlewares

app.use(express.json());
app.use(cors());

// import routes
app.use('/user', userRoutes);



app.get('/', (req, res) => {
   res.send('first getting');
})

app.listen(PORT, () => {
   console.log('listening on port ' + PORT);
})