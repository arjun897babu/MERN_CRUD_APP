const express = require('express');
const app = express();
require('dotenv').config()
const connectDB = require('./database/connection')

//connecting mongodb database
connectDB()

//app server
const PORT = process.env.PORT || 8080
app.get('/', (req, res) => {
  res.send('welcome crud app')
})

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
}) 