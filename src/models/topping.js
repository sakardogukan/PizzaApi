"use strict"
/* ---------------- TOPPING MODEL --------------- */

const { mongoose } = require('../config/dbConnection')

const ToppingSchema = new mongoose.Schema({
    //id autoCreated
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }

}, {
    collection: 'toppings',
    timestamps: true
})

module.exports = mongoose.model('Topping', ToppingSchema)
