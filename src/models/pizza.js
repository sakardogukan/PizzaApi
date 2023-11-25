"use strict"
/* ---------------- PIZZA MODEL --------------- */

const { mongoose } = require('../config/dbConnection')

const PizzaSchema = new mongoose.Schema({
    //id autoCreated
    name: {
        type: String,
        trim: true,
        unique: [true, 'There is this Pizzaname. Pizza name filed must be unique'],
        required: [true, 'Pizza Name filed must be required!']
    },
    image: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        trim: true,
        required: true,
    },
    toppings: [ // push, pull
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Topping'
        }
    ]
}, {
    collection: 'pizzas',
    timestamps: true
})

module.exports = mongoose.model('Pizza', PizzaSchema)