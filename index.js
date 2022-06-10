const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000
const DB_URI =
  'mongodb+srv://sistema-gestao-admin:sSSqVcv5lVTLdqSR@sistema-gestao-sp.mo7oxvo.mongodb.net/?retryWrites=true&w=majority'

const agentsRoutes = require('./routes/agent_routes')

try {
  mongoose.connect(
    DB_URI,
    { dbName: 'sistema-gestao-db', useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Success connecting to database')
  )
} catch (error) {
  console.log('Could not connect to database')
  console.log(error)
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/agents', agentsRoutes)

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(port, () => {
  console.log('Listening on port : ', port)
})
