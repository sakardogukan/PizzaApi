"use strict"
/* ---------------------- USER MODEL ------------------- */

const { mongoose } = require('../config/dbConnection')

const UserSchema = new mongoose.Schema({
    //id autoCreated
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email filed must be required!'],
        validate: [
            (email) => email.includes('@') && email.includes('.'),
            'Email type is not correct!'
        ]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'users',
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)