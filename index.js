const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const agentsRoutes = require('./routes/agent_routes')

const app = express()

dotenv.config()
const port = process.env.PORT || 3000
const DB_URI =  process.env.MONGODB_URI_LOCAL
const DB_NAME = process.env.DB_NAME_LOCAL


try {
  mongoose.connect(
    DB_URI,
    { dbName: DB_NAME, useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Success connecting to database',  DB_NAME)
  )
} catch (error) {
  console.log('Could not connect to database', DB_NAME)
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
