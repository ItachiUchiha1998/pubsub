/* eslint-disable no-undef */
// modules
import express from 'express'
import logger from 'morgan'
import mongoose from 'mongoose'
import Redis from 'ioredis'

// file imports
import index from './routes/index'

const app = express()
const port = process.env.PORT || 8000

// middlewares
app.use(logger('dev'))
app.use('/', index)

// try {
//   const redisOptions = {
//     host: 'redis-16318.c256.us-east-1-2.ec2.cloud.redislabs.com',
//     port: 16318,
//     password: 'RN8LASxaNRLysrLR2BYx6Q7NOyx7pNFk'
//   }
//   const redis = new Redis(redisOptions)
//   console.log('Redis connected')
// } catch(err) {
//   console.log('Error')
// }

// mongo
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
})

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
})
