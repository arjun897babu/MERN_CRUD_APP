import express from 'express';

import connectDB from './database/connection.js';


const app = express();

// Connecting to MongoDB database
connectDB();

// App server
const PORT = process.env.PORT || 8080;
app.get('/', (req, res) => {
  res.send('Welcome to the CRUD app');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});