const express = require('express')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')

const connectDB = require('./config/db')

const app = express()

// Connect MongoDB
connectDB()

// Body Parser middleware
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))

// Cors Middleware
app.use(cors())

// Routes
app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/posts', require('./routes/posts'))

app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port: ${process.env.PORT}`)
})