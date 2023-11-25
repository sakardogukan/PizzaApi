"use strict"
/* ---------------- AUTHORIZATION ------------- */

const jwt = require('jsonwebtoken')
const User = require('../models/user')
const setToken = require('../helpers/setToken')

module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body
        if (username && password) {
            const user = await User.findOne({ username, password })
            if (user) {
                if (user.isActive) {
                    // const accessData = {
                    //     username: user.username,
                    //     password: user.password
                    // }
                    // const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, { expiresIn: '10m' }) //session da

                    // const refreshData = {
                    //     _id: user._id,
                    //     password: user.password
                    // }
                    // const refreshToken = jwt.sign(refreshData, process.env.REFRESH_KEY, { expiresIn: '3d' }) // cookie de

                    // res.send({
                    //     error: false,
                    //     token: {
                    //         access: accessToken,
                    //         refresh: refreshToken
                    //     }
                    // })
                    res.send({
                        error: false,
                        token: setToken(user)
                    })
                } else {
                    res.errorStatusCode = 401
                    throw new Error('This account is not active.')
                }
            } else {
                res.errorStatusCode = 401
                throw new Error('Wrong username and password.')
            }
        } else {
            res.errorStatusCode = 401
            throw new Error('Please enter your username and password.')
        }
    },
    refresh: async (req, res) => {
        const refreshToken = req.body?.token?.refresh
        if (refreshToken) {
            jwt.verify(refreshToken, process.env.REFRESH_KEY, async function (err, userData) {
                if (err) {
                    res.errorStatusCode = 401
                    throw err
                } else {
                    const { _id, password } = userData
                    if (_id && password) {
                        const user = await User.findOne({ _id })
                        if (user && user.password == password) {
                            if (user.isActive) {
                                res.send({
                                    error: false,
                                    token: setToken(user, true)
                                })
                            } else {
                                res.errorStatusCode = 401
                                throw new Error('This account is not Active.')
                            }
                        } else {
                            res.errorStatusCode = 401
                            throw new Error('Wrong is or password')
                        }
                    } else {
                        res.errorStatusCode = 401
                        throw new Error('Please enter id and password.')
                    }
                }
            })
        } else {
            res.errorStatusCode = 401
            throw new Error(' Please enter token.Refresh')
        }
    },
    logout: async (req, res) => {
        res.send({
            error: false,
            message: 'No need any doing for logout. You must deleted Bearer Token from your browser.'
        })
    }
}