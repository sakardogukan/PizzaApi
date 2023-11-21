"use strict"
/* ------------------ SYNCRONIZATION ---------------- */

module.exports = async function () {
    return null

    /* REMOVE DATABASE */
    const mongoose = require('../config/dbConnection')
    await mongoose.connection.dropDatabase()
    console.log('- Database and all data DELETED!')
}