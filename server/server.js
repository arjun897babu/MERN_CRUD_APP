import express from 'express';

import connectDB from './database/connection.js';
import userRoutes from './routes/user.js';
import adminRoutes from './routes/admin.js';
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser'
const app = express();

//cors
app.use(cors({
  origin: `http://localhost:3000`,
  credentials:true
}))
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: false })); // For parsing application/x-www-form-urlencoded
app.use(cookieParser())

// Connecting to MongoDB database
connectDB();

//loading static folder

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/public', express.static(path.join(__dirname, 'public')));

//loading user routes
app.use('/user', userRoutes)

//loading admin routes
app.use('/admin', adminRoutes)

// App server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 