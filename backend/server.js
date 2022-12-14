const express = require('express')
const dotenv = require('dotenv').config();
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleware')
// Calling the ConnectDB
const connectDB = require('./config/db')
const port = process.env.PORT || 5000;


connectDB();

const app = express();

// middlewares needed for post requests to work fine
app.use(express.json());
app.use(express.urlencoded({extended: false}))

//GET REQUEST

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// USING ERROR HANDLER
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))