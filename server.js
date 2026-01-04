// dotenv
const dotenv = require('dotenv');

dotenv.config();
// mongoose
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log('Connected to DB');
});
// express
const express = require('express');
const cors = require('cors');

const app = express();
// Controllers
const morgan = require('morgan');

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes

app.listen(3000, () => {
  console.log('Express is ready');
});