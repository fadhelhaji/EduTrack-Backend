// dotenv
const dotenv = require('dotenv');
dotenv.config();

// express
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log('Connected to DB');
});

// controllers
const authCtrl = require('./controllers/auth');
const classCtrl = require('./controllers/classes');
const assignmentCtrl = require('./controllers/assignments')
const submissionCtrl = require('./controllers/submissions')

// middleware
const verifyToken = require('./middleware/verifyToken');

// global middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// public routes
app.use('/auth', authCtrl);


// protected routes
app.get('/test', (req, res) => {
  res.status(200).json({ message: "Hello, You're logged in" });
});

app.use('/class', verifyToken, classCtrl);
app.use('/assignment', verifyToken, assignmentCtrl);
app.use('/submission', verifyToken, submissionCtrl);

// auth middleware
// app.use(verifyToken);


// server
app.listen(3000, () => {
  console.log('Express is ready');
});
