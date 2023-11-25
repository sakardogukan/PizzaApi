"use strict"
/* --------------------- DB CONNECTION --------------- */
require('dotenv').config()
const mongoose = require('mongoose')

const dbConnection = function () {
    mongoose.connect((process.env?.MONGODB || 'mongodb://127.0.0.1:27017/pizzaApiApp'))
        .then(() => console.log(' * DB Connected * '))
        .catch((err) => console.log(' * DB Not Connected * ', err))
}

module.exports = {
    mongoose,
    dbConnection
}