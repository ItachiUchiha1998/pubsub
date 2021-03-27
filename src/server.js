/* eslint-disable no-undef */
// modules
import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';

// file imports
import index from './routes/index';

const app = express();
const port = process.env.PORT || 8000;

// middlewares
app.use(logger('dev'));
app.use('/', index);

mongoose.connect('mongodb+srv://test:test123@pandora.qwpf4.mongodb.net/animall?retryWrites=true&w=majority', 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => {
    console.log("database set up");
  })
  .catch(function(err) {
    console.log(err)
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
})
