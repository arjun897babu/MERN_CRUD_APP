const mongoose = require('mongoose');


datbaseURI = process.env.MONGO_URI//mongodb uri from .env file

const connectDB = async () => {
  try {
    const con = await mongoose.connect(datbaseURI)
    console.log(`mongodb is connected : ${con.connection.host}`)
  } catch (error) {
    console.log(`mongodb connection failed with : ${error.message}`)
  }
}

module.exports = connectDB