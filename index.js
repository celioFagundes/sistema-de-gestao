const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT  = process.env.PORT || 3000
const DB_URI = process.env.MONGODB_URI

app.get('/', (req,res) =>{
    res.send('Hello world')
})


app.listen(PORT, (req, res) =>{
    console.log('Listening on port:', PORT)
})

mongoose
  .connect(DB_URI)
  .then(() => {
    createInitialUsers()
    app.listen(port, () => {
      console.log('Listening on port : ', port)
    })
  })
  .catch(e => console.log(e))