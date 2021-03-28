/* eslint-disable no-undef */
// modules
import express from 'express'
import logger from 'morgan'
import mongoose from 'mongoose'

// file imports
import index from './routes/index'
import { 
  PORT,
  MONGO_SERVER
} from './config'

const app = express()
const port = process.env.PORT || PORT

// middlewares
app.use(logger('dev'))
app.use('/', index)

// mongo
mongoose.connect(MONGO_SERVER, 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false 
  })
  .then(() => {
    console.log("database set up");
  })
  .catch(function(err) {
    console.log(err)
})

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
})
