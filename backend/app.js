const express = require('express');
app = express();
const mongoose = require('mongoose');
const PORT = 3000;



app.get('/', (req, res) => {
   res.send('first getting');
})

app.listen(PORT, () => {
   console.log('listening on port ' + PORT);
})