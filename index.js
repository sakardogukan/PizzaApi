"use strict"
/* --------------------- INDEX.JS -------------------- */
//! Required Moduls:

const express = require('express')
const app = express()

//? envVariables to process.env:
require('dotenv').config()
const PORT = process.env.PORT || 8000

//? asyncErrors to errorHandler:
require('express-async-errors')

app.use(express.json())

/* --------------------------------------------------- */
//! Configuration:

//? Connect to DB:
const { dbConnection } = require('./src/config/dbConnection')
dbConnection()

/* --------------------------------------------------- */
//! Middlewares:

//? Accept JSON:
app.use(express.json())

//? SearchingSortinPagination:
app.use(require('./src/middlewares/findSearchSortPage'))

//? Run Logger:
app.use(require('./src/middlewares/logger'))

/* --------------------------------------------------- */
//! Routes:

//? Home Path:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to Pizza API'
    })
})

//? User:
app.use('/users', require('./src/routes/user'))




/* --------------------------------------------------- */



/* --------------------------------------------------- */
//? errorHandler:
app.use(require('./src/middlewares/errorHandler'))

//? Port Listen:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* --------------------------------------------------- */
//? Syncronization (must be in commentLine):
// require('./src/helpers/sync')()