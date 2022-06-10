const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = process.env.PORT || 3000
const DB_URI = process.env.MONGODB_URI

const agentsRoutes = require('./routes/agent_routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/agents', agentsRoutes)

app.get('/', (req, res) => {
  res.send('Hello world')
})

mongoose
  .connect(DB_URI, { tls: true })
  .then(() => {
    app.listen(port, () => {
      console.log('Listening on port : ', port)
    })
  })
  .catch(e => console.log(e))
