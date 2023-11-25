"use strict"
/* ---------------- USER MODEL --------------- */

const { mongoose } = require('../config/dbConnection')
const passwordEncrypt = require('../helpers/passwordEncrypt')

const UserSchema = new mongoose.Schema({
    //id autoCreated
    username: {
        type: String,
        trim: true,
        unique: [true, 'There is this username. Username filed must be unique'],
        required: [true, 'Username filed must be required!']
    },
    password: {
        type: String,
        trim: true,
        required: true,
        // set: (password) => password + '*123'
        set: (password) => passwordEncrypt(password)
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email filed must be required!'],
        unique: [true, 'There is this email. Email filed must be unique'],
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