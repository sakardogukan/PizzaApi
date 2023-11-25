"use strict"
/* ---------------- ORDER MODEL --------------- */

const { mongoose } = require('../config/dbConnection')

const OrderSchema = new mongoose.Schema({
    //id autoCreated
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID in Order filed must be required!']
    },
    pizzaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pizza',
        required: [true, 'Pizza ID in Order filed must be required!']
    },
    size: {
        type: String,
        required: true,
        enum: ['Small', 'Medium', 'Large']
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true,
        default: 1.0
    },
    totalPrice: {
        type: Number,
    }

}, {
    collection: 'orders',
    timestamps: true
})

module.exports = mongoose.model('Order', OrderSchema)