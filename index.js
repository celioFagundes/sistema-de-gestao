const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost/sis-gestao-dev'

const agentsRoutes = require('./routes/agent_routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/agents', agentsRoutes)

app.get('/', (req, res) => {
  res.send('Hello world')
})

const client = new MongoClient(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})
client.connect()
mongoose.connection.once('open', () => { console.log('MongoDB Connected'); });
mongoose.connection.on('error', (err) => { console.log('MongoDB connection error: ', err); }); 

app.listen(port, () => {
  console.log('Listening on port : ', port)
})
