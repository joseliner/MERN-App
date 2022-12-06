require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const cors = require("cors");
const path = require("path");
// Express app
const app = express()

// Middleware
app.use(cors());
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Pulling in React Code to serve thru the backend
// const publicDirectory = path.join(__dirname, "../frontend/public");
// app.use(express.static(publicDirectory));

// app.get("*", (req, res) => {
//   res.sendFile(publicDirectory);
// });

// Routes
app.use('/api/workouts', workoutRoutes)

// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
          console.log('Connected to db & listening on port 4000!', process.env.PORT)
        })
      })
        .catch((error) => {
        console.log(error)
    })
