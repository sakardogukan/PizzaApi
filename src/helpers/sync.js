"use strict"
/* ------------------ SYNCRONIZATION ---------------- */

module.exports = async function () {
    // return null
    
    // Remove DB
    const {mongoose} = require('../config/dbConnection')
    await mongoose.connection.dropDatabase()
    console.log('- Database and all data DELETED!')
}