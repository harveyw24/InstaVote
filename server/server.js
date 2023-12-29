require('dotenv').config({ path: './config.env' });

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/voteSession', require('./routes/voteSession'));
app.use('/api/vote', require('./routes/vote'));

// connect to mongoDB
mongoose.connect(process.env.ATLAS_URI)
     .then(() => {
          console.log('MongoDB database connection established successfully')
          app.listen(port, () => {
               // // perform a database connection when server starts
               // dbo.connectToServer(function (err) {
               //      if (err) console.error(err);
               // });
               console.log(`Server is running on port: ${port}`);
          });
          
     })
     .catch(err => console.log(err));